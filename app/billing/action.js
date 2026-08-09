"use server";

import { getCustomerByQuery } from "../_lib/dataService";

export async function getCustomerAction(query) {
  let customer = await getCustomerByQuery(query);

  return customer;
}
