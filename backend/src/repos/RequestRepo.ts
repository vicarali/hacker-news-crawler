import { getRandomInt } from '@src/common/utils/number-utils';
import { Request } from '@src/models/Request.model';

import orm from './MockOrm';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Add a request.
 */
async function add(request: Request): Promise<void> {
  const db = await orm.openDb();
  request.id = getRandomInt();
  db.requests.push(request);
  return orm.saveDb(db);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  add,
} as const;
