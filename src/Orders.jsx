
import { Toc } from "@material-ui/icons";
import React from "react";
import {
    Create,
    Datagrid,
    Edit,
    Filter,
    List,
    NumberField,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    Show,
    SimpleForm,
    Tab,
    TabbedShowLayout,
    TextField,
    TextInput,
    required
} from "react-admin";
export const OrderIcon = Toc;

export const OrderDetailField = ({ record, source }) => {
    if (!record[source]) {
        return null;
    }
    console.log(record[source]);

    return (
        <div>
            {record[source].map(orderLine => (
                <table>
                    <tr>
                        <td>
                            {orderLine.description.replace("1 gram", `${orderLine.quantity} gram`)}{" "}
                            {orderLine.kind_name ? orderLine.kind_name : orderLine.product_name}
                        </td>
                    </tr>
                </table>
            ))}
        </div>
    );
};
OrderDetailField.defaultProps = { addLabel: true };

const OrderFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Shop" source="shop_id" reference="shops" allowEmpty alwaysOn>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

// const OrderPagination = props => <Pagination rowsPerPageOptions={[10, 20]} {...props} />;

export const OrderShow = props => (
    <Show title={<OrderTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="info">
                {/*<h2>Product kinds with this Order</h2>*/}
                {/*<ReferenceManyField reference="kinds-to-orders" target="order_id" addLabel={false}                     pagination={<OrderPagination />}*/}
                {/*                    perPage={20}>*/}
                {/*    <Datagrid>*/}
                {/*        <ReferenceField source="kind_id" reference="kinds">*/}
                {/*            <TextField source="name" />*/}
                {/*        </ReferenceField>*/}
                {/*        <EditButton />*/}
                {/*        <DeleteButton />*/}
                {/*    </Datagrid>*/}
                {/*</ReferenceManyField>*/}
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const OrderList = props => (
    <List {...props} perPage={100} sort={{ field: "created_at", order: "DESC" }} filters={<OrderFilter />}>
        <Datagrid>
            <TextField source="customer_order_id" />
            <ReferenceField source="shop_id" reference="shops" label="Shop">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="table_id" reference="tables" label="Table" allowEmpty>
                <TextField source="name" />
            </ReferenceField>
            <TextField source="status" />
            <TextField source="completed_by_name" label="by" />
            <TextField source="created_at" />
            <OrderDetailField source="order_info" />
            <NumberField
                source="total"
                locales="nl-NL"
                options={{ style: "currency", currency: "EUR" }}
                sortable={false}
            />
        </Datagrid>
    </List>
);

const OrderTitle = ({ record }) => {
    return <span>Order {record ? `"${record.name}"` : ""}</span>;
};

export const OrderEdit = props => (
    <Edit title={<OrderTitle />} {...props} redirect="list">
        <SimpleForm redirect="list">
            <TextInput disabled source="id" />
            <TextInput source="name" autoFocus validate={required()} />
        </SimpleForm>
    </Edit>
);

export const OrderCreate = props => (
    <Create title="Create a Order" {...props} redirect="list">
        <SimpleForm redirect="list">
            <TextInput source="name" autoFocus validate={required()} />
        </SimpleForm>
    </Create>
);
