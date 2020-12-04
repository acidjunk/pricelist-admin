import { Link } from "@material-ui/icons";
import { parse } from "query-string";
import React from "react";
import {
    AutocompleteInput,
    BooleanInput,
    Create,
    DisabledInput,
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextField,
    required
} from "react-admin";

export const ShopsToPricesIcon = Link;

const ShopsToPricesTitle = ({ record }) => {
    return <span>ShopsToPrices {record ? `"${record.id}"` : ""}</span>;
};

const redirect = (basePath, id, data) => `/shops/${data.shop_id}/show`;

const priceRenderer = choice =>
    `${choice.internal_product_id} 0.5g:${choice.half} 1g:${choice.one} 2.5g:${choice.two_five} 5g:${choice.five} J:${choice.joint} P:${choice.piece}`;

export const ShopsToPricesEdit = props => {
    // TODO: find a way to query the shop_id (maybe 3.0??)
    // const { shop_id } = parse(props.location.search);

    return (
        <Edit title={<ShopsToPricesTitle />} {...props} undoable={false}>
            <SimpleForm redirect={redirect}>
                <DisabledInput source="id" />
                <BooleanInput source="active" label="Show price to customers?" />
                <BooleanInput source="new" defaultValue={false} label="Show the product as NEW?" />
                <ReferenceInput
                    source="price_id"
                    reference="prices"
                    perPage={100}
                    sort={{ field: "internal_product_id" }}
                    validate={required()}
                >
                    <AutocompleteInput optionText={priceRenderer} translateChoice={false} />
                </ReferenceInput>
                <ReferenceInput
                    source="category_id"
                    reference="categories"
                    perPage={100}
                    label="Product Category"
                    // filter={{ shop_id: shop_id }}
                >
                    <SelectInput optionText="category_and_shop" />
                </ReferenceInput>
                <ReferenceInput source="kind_id" reference="kinds" label="Cannabis Product" allowEmpty>
                    <AutocompleteInput optionText="name" translateChoice={false} />
                </ReferenceInput>

                <ReferenceInput source="product_id" reference="products" label="Horeca Product" allowEmpty>
                    <AutocompleteInput optionText="name" translateChoice={false} />
                </ReferenceInput>

                <TextField source="half" label={"Configured price for 0,5 gram"} />
                <BooleanInput source="use_half" label="Use price for 0,5 gram?" />
                <TextField source="one" label={"Configured price for 1 gram"} />
                <BooleanInput source="use_one" label="Use price for 1 gram?" />
                <TextField source="two_five" label={"Configured price for 2.5 grams"} />
                <BooleanInput source="use_two_five" label="Use price for 2,5 grams?" />
                <TextField source="five" label={"Configured price for 5 grams"} />
                <BooleanInput source="use_five" label="Use price for 5 grams?" />
                <TextField source="joint" label={"Configured price for 1 joint"} />
                <BooleanInput source="use_joint" label="Use price for joint?" />
                <TextField source="piece" label={"Configured price for 1 piece"} />
                <BooleanInput source="use_piece" label="Use price for piece?" />
            </SimpleForm>
        </Edit>
    );
};

export const ShopsToPricesCreate = props => {
    const { shop_id } = parse(props.location.search);
    return (
        <Create title="Create a ShopsToPrices" {...props}>
            <SimpleForm redirect={redirect} defaultValue={{ shop_id }}>
                <BooleanInput source="active" defaultValue={true} label="Show price to customers?" />
                <BooleanInput source="new" defaultValue={false} label="Show the product as NEW?" />
                <ReferenceInput
                    source="price_id"
                    reference="prices"
                    perPage={100}
                    sort={{ field: "internal_product_id" }}
                    validate={required()}
                >
                    <AutocompleteInput optionText={priceRenderer} translateChoice={false} />
                </ReferenceInput>
                <ReferenceInput
                    source="category_id"
                    reference="categories"
                    perPage={100}
                    label="Product Category"
                    filter={{ shop_id: shop_id }}
                >
                    <SelectInput optionText="category_and_shop" />
                </ReferenceInput>
                <ReferenceInput source="kind_id" reference="kinds" label="Cannabis Product" allowEmpty>
                    <AutocompleteInput optionText="name" translateChoice={false} />
                </ReferenceInput>

                <ReferenceInput source="product_id" reference="products" label="Horeca Product" allowEmpty>
                    <AutocompleteInput optionText="name" translateChoice={false} />
                </ReferenceInput>

                <BooleanInput source="use_half" label="Use price for 0,5 gram?" />
                <BooleanInput source="use_one" defaultValue={true} label="Use price for 1 gram?" />
                <BooleanInput source="use_two_five" label="Use price for 2,5 grams?" />
                <BooleanInput source="use_five" defaultValue={true} label="Use price for 5 grams?" />
                <BooleanInput source="use_joint" defaultValue={true} label="Use price for joint?" />
                <BooleanInput source="use_piece" label="Use price for piece?" />
            </SimpleForm>
        </Create>
    );
};
