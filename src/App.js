// in app.js
import React from 'react';
import { render } from 'react-dom';
import { simpleRestClient, Admin, Resource } from 'admin-on-rest';

import { FlavorList, FlavorEdit, FlavorCreate, FlavorIcon } from './Flavors';

render(
    <Admin restClient={simpleRestClient('http://localhost:3000')}>
      <Resource name="posts" list={FlavorList} edit={FlavorEdit} create={FlavorCreate} icon={FlavorIcon}/>
    </Admin>,
    document.getElementById('root')
);