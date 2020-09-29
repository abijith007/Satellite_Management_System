import pandas as pd
import pymysql.cursors
import math

def send_to_db(relations):
    # Connect to the database
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='MVkdchspbl1@!',
                                 db='sat_man_sys',
                                 charset='utf8',
                                 cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
            # Create a new record
            sql1 = "INSERT INTO `Manufacturing_Sat` VALUES (%s, %s)"
            sql2 = "INSERT INTO `Owner_Sat` VALUES (%s, %s)"
            sql3 = "INSERT INTO `Launch_Sat` VALUES (%s, %s)"
            for ele in relations:
                try:
                    cursor.execute(sql1, (str(ele[1]), str(ele[0])))
                    cursor.execute(sql2, (str(ele[2]), str(ele[0])))
                    cursor.execute(sql3, (str(ele[3]), str(ele[0])))
                finally:
                    pass

        # connection is not autocommit by default. So you must commit to save
        # your changes.
        connection.commit()

    finally:
        connection.close()

# data = pd.read_excel (r'/Users/abeervaishnav/Documents/SublimeProjects/JS Projects/SatProject/UCS_Satellite_Database_4-1-2019.xlsx')

# df = pd.DataFrame(data[:50], columns= ['Name', 'Launch_Vehicle'])
# print(df)

# 0: sid
# 1: moid
# 2: oid
# 3: lid

relations = [[1, 1, 1, 1], [2, 2, 2, 1], [3, 3, 3, 2], [4, 4, 4, 2], [5, 5, 4, 3],
             [6, 5, 4, 3], [7, 4, 4, 3], [8, 6, 4, 4], [9, 7, 4, 2], [10, 8, 5, 3],
             [11, 8, 5, 3], [12, 9, 5, 3], [13, 9, 5, 3], [14, 9, 5, 3], [15, 9, 5, 3],
             [16, 10, 6, 3], [17, 10, 6, 3], [18, 10, 6, 3], [19, 11, 7, 5], [20, 27, 8, 2],
             [21, 12, 9, 6], [22, 12, 9, 6], [23, 12, 9, 7], [24, 12, 9, 7], [25, 12, 9, 5],
             [26, 12, 9, 8], [27, 12, 9, 8], [28, 12, 9, 5], [29, 12, 9, 3], [30, 12, 9, 3],
             [31, 12, 9, 5], [32, 12, 9, 5], [33, 13, 10, 2], [34, 14, 22, 5], [35, 15, 11, 1],
             [36, 28, 12, 1], [37, 28, 12, 4], [38, 16, 13, 9], [39, 17, 13, 4], [40, 18, 13, 10],
             [41, 19, 14, 5], [42, 20, 15, 2], [43, 21, 16, 6], [44, 22, 17, 11], [45, 23, 18, 12],
             [46, 24, 19, 5], [47, 25, 20, 5], [48, 27, 17, 1], [49, 26, 17, 1], [50, 26, 21, 1]]

print(relations)

send_to_db(relations)
