import fs from 'fs';
import jsonfile from 'jsonfile';

import { Request } from '@src/models/Request.model';

/******************************************************************************
                                Constants
******************************************************************************/

const DATABASE_FILE_PATH = __dirname + '/common/database.json';

/******************************************************************************
                                Types
******************************************************************************/

type Database = {
  requests: Request[];
};

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Fetch the json from the file.
 */
async function openDb(): Promise<Database> {
  if (fs.existsSync(DATABASE_FILE_PATH)) {
    return await (jsonfile.readFile(DATABASE_FILE_PATH) as Promise<Database>);
  } else {
    return { requests: [] } as Database;
  }
}

/**
 * Update the file.
 */
function saveDb(db: Database): Promise<void> {
  return jsonfile.writeFile(DATABASE_FILE_PATH, db);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  openDb,
  saveDb,
} as const;
