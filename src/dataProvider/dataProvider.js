import { stringify } from "query-string";
import {
    CREATE,
    DELETE,
    DELETE_MANY,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
    fetchUtils
} from "ra-core";

/**
 * Maps react-admin queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts
 * DELETE       => DELETE http://my.api.url/posts/123
 */

function convertFilter(filter) {
    return Object.entries(filter).map(entry => (entry[0] === "q" ? entry[1] : `${entry[0]}:${entry[1]}`));
}

function getManyFilter(filter) {
    console.log(filter);
    return filter.join(",");
    // debugger;
}

export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = "";
        const options = {};

        switch (type) {
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                // Todo: support other search stuff also: for now only quick search:
                const filter = params.filter.hasOwnProperty("q") ? params.filter.q : "";
                const query = {
                    // Todo: support multicolumn sort?
                    sort: `${field}:${order}`,
                    skip: (page - 1) * perPage,
                    limit: perPage,
                    filter: convertFilter(params.filter)
                };
                url = `${apiUrl}/${resource}/?${stringify(query)}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY: {
                const query = {
                    filter: getManyFilter(params.ids)
                };
                url = `${apiUrl}/${resource}/?${stringify(query)}`;
                break;
            }
            case "getTree": {
                // const { field, order } = params.sort;

                // Todo: support other search stuff also: for now only quick search:
                // Todo: add ID also?
                const filter = params.filter.hasOwnProperty("q") ? params.filter.q : params.filter;

                const query = {
                    // sort: `${field}:${order}`,
                    filter: filter
                };
                url = `${apiUrl}/trees/${resource}?${stringify(query)}`;
                break;
            }
            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                let filter = "";
                // Todo: handle other filter stuff also!
                if (params.target) {
                    filter = `${params.target}:${params.id}`;
                }

                // [params.target]: params.id
                const query = {
                    // Todo: support multicolumn sort?
                    sort: `${field}:${order}`,
                    skip: (page - 1) * perPage,
                    limit: perPage,
                    filter: filter
                };
                url = `${apiUrl}/${resource}/?${stringify(query)}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = "PUT";
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}/`;
                options.method = "POST";
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = "DELETE";
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        const { headers, json } = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                if (!headers.has("content-range")) {
                    throw new Error(
                        "The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?"
                    );
                }
                return {
                    data: json,
                    total: parseInt(
                        headers
                            .get("content-range")
                            .split("/")
                            .pop(),
                        10
                    )
                };
            case CREATE:
                return { data: { ...params.data, id: json.id } };
            case DELETE_MANY: {
                return { data: json || [] };
            }
            default:
                return { data: json };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return (type, resource, params) => {
        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: "PUT",
                        body: JSON.stringify(params.data)
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json)
            }));
        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: "DELETE"
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json)
            }));
        }

        const { url, options } = convertDataRequestToHTTP(type, resource, params);
        return httpClient(url, options).then(response => convertHTTPResponse(response, type, resource, params));
    };
};
