import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '~/pages/Login';

import OrdersTable from '~/pages/Orders/Table';
import OrdersCreate from '~/pages/Orders/Create';
import OrdersEdit from '~/pages/Orders/Edit';

import DeliverersTable from '~/pages/Deliverers/Table';
import DeliverersCreate from '~/pages/Deliverers/Create';
import DeliverersEdit from '~/pages/Deliverers/Edit';

import RecipientsTable from '~/pages/Recipients/Table';
import RecipientsCreate from '~/pages/Recipients/Create';
import RecipientsEdit from '~/pages/Recipients/Edit';

import DeliveryProblemsTable from '~/pages/DeliveryProblems/Table';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />

      <Route path="/orders" exact component={OrdersTable} isPrivate />
      <Route path="/orders/create" component={OrdersCreate} isPrivate />
      <Route path="/orders/:id/edit" component={OrdersEdit} isPrivate />

      <Route path="/deliverers" exact component={DeliverersTable} isPrivate />
      <Route path="/deliverers/create" component={DeliverersCreate} isPrivate />
      <Route path="/deliverers/:id/edit" component={DeliverersEdit} isPrivate />

      <Route path="/recipients" exact component={RecipientsTable} isPrivate />
      <Route path="/recipients/create" component={RecipientsCreate} isPrivate />
      <Route path="/recipients/:id/edit" component={RecipientsEdit} isPrivate />

      <Route
        path="/delivery-problems"
        exact
        component={DeliveryProblemsTable}
        isPrivate
      />
    </Switch>
  );
}
