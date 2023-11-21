import sqlite3
import constants

def setup(filename=constants.data_sqlite):
    with sqlite3.connect(filename) as conn:
        cur=conn.cursor()
        cur.execute(constants.create_user_table)
        conn.commit()
        cur.execute(constants.create_parthners_table)
        conn.commit()
        cur.execute(constants.create_orders_table)
        conn.commit()
        cur.execute(constants.create_tasks_table)
        conn.commit()
        #cur.execute(constants.create_addresses_table)
        #conn.commit()
        #cur.execute(constants.create_products_table)
        #conn.commit()
        #cur.execute(constants.create_logistic_leg_table)
        #conn.commit()
        #cur.execute(constants.create_custom_leg_table)
        #conn.commit()


def query_db(sql, filename, values=None):
    conn = sqlite3.connect(filename)
    cur = conn.cursor()
    try:
        if values is not None and values != ('',):
            #print('values is not None', sql, values)
            cur.execute(sql, values)
        else:
            cur.execute(sql)
        if sql.strip().lower().startswith('select'):
            result = cur.fetchall()
        else:
            result = cur.lastrowid  # For INSERT, UPDATE, DELETE, etc.
    except sqlite3.Error as e:
        conn.rollback()
        raise e
    else:
        conn.commit()
    finally:
        conn.close()
    return result


#setup()


