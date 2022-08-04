import { RestaurantMenu } from "@material-ui/icons";
import React from "react";
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceInput,
    SelectInput,
    ShowButton,
    SimpleForm,
    TextField,
    TextInput,
    required
} from "react-admin";
import QRCode from "react-qr-code";

import API_URL from "./Constants";

export const TableIcon = RestaurantMenu;

const TableFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Shop" source="shop_id" reference="shops" allowEmpty alwaysOn>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const QrImageField = ({ record, source }) => {
    if (!record[source]) {
        return null;
    }
    const url = `https://app.prijslijst.info/shop/${record.shop_id}/${record.id}`;
    return (
        <a href={url}>
            <div style={{ background: "white", padding: "30px" }}>
                <QRCode value={url} />
            </div>
        </a>
    );
};
QrImageField.defaultProps = { addLabel: true };

export const TableList = props => (
    <List {...props} filters={<TableFilter />} perPage="100">
        <Datagrid>
            <TextField source="name" />
            <TextField source="shop_name" sortable={false} />
            <QrImageField source="id" sortable={false} label="QR code" />
            <EditButton basePath="/tables" />
            <ShowButton basePath="/tables" />
        </Datagrid>
    </List>
);

const TableTitle = ({ record }) => {
    return <span>Table {record ? `"${record.name}"` : ""}</span>;
};

export const TableEdit = props => (
    <Edit title={<TableTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" autoFocus validate={required()} />
            <TextField source="shop_name" />
        </SimpleForm>
    </Edit>
);

export const TableCreate = props => (
    <Create title="Create a Table" {...props}>
        <SimpleForm>
            <TextInput source="name" autoFocus validate={required()} />
            <ReferenceInput source="shop_id" reference="shops" perPage={100} validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
