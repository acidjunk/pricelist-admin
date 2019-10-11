import React from "react";
import {parse} from "query-string";

import {
    BooleanInput,
    Create,
    DisabledInput,
    Edit,
    ReferenceInput,
    required,
    AutocompleteInput,
    SelectInput,
    SimpleForm,
    TextField
} from "react-admin";
import {Link} from "@material-ui/icons";

export const ShopsToPricesIcon = Link;

const ShopsToPricesTitle = ({ record }) => {
    return <span>ShopsToPrices {record ? `"${record.id}"` : ""}</span>;
};

const redirect = (basePath, id, data) => `/shops/${data.shop_id}/show`;

export const ShopsToPricesEdit = props => (
    <Edit title={<ShopsToPricesTitle />} {...props}>
        <SimpleForm redirect={redirect}>
            <DisabledInput source="id" />
            <BooleanInput source="active" label="Show price to customers?" />
            <ReferenceInput
                source="price_id"
                reference="prices"
                // label="Internal Product ID"
                validate={required()}
            >
                <AutocompleteInput optionText="internal_product_id" translateChoice={false} />
                {/*<SelectInput optionText="internal_product_id" />*/}
            </ReferenceInput>
            <ReferenceInput source="category_id" reference="categories" perPage={100} label="Product Category">
                <SelectInput optionText="category_and_shop" />
            </ReferenceInput>
            <ReferenceInput source="kind_id" reference="kinds" label="Product Kind" validate={required()}>
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

export const ShopsToPricesCreate = props => {
    const { shop_id } = parse(props.location.search);
    return (
        <Create title="Create a ShopsToPrices" {...props}>
            <SimpleForm redirect={redirect} defaultValue={{ shop_id }}>
                <BooleanInput source="active" defaultValue={true} label="Show price to customers?" />
                <ReferenceInput
                    source="price_id"
                    reference="prices"
                    perPage={100}
                    label="Internal Product ID"
                    validate={required()}
                >
                    <SelectInput optionText="internal_product_id" />
                </ReferenceInput>
                <ReferenceInput source="category_id" reference="categories" perPage={100} label="Product Category">
                    <SelectInput optionText="category_and_shop" />
                </ReferenceInput>
                <ReferenceInput
                    source="kind_id"
                    reference="kinds"
                    perPage={100}
                    label="Product Kind"
                    validate={required()}
                >
                    <SelectInput optionText="name" />
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
