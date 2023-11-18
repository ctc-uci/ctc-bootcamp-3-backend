import csv
import random

FILE_PATH = './form-responses.csv'
OUTFILE_PATH = './form-insert.sql'

# assuming following format:
# index | column
# --------------
# 0     | timestamp
# 1     | name
# 2     | year
# 3     | major/minor
# 4     | project
# 5     | mbti
# 6     | bday
# 7     | spirit animal
# 8     | truth1
# 9     | truth2
# 10    | lie
# 11    | rps_move
# 12    | hangman_phrase
# 13    | bio
# 14    | quote 
# 15    | link

def set_blank_fields_to_null(subarr, expected_len):
    '''
    Given an array of an expected length,
    return the subarray with all of the blank fields set to null.
    Assumes that expected length is greater than or equal to that of the subarray 
    '''
    if len(subarr) > expected_len:
        raise ValueError("Expected Length should be greater than or equal to that of the subarray")
    return [
        ("NULL" if elem == "" else elem) for elem in subarr
    ] + ["NULL" for _ in range(expected_len - len(subarr))]

def process_value(val):
    if val == "NULL":
        return "NULL"
    elif isinstance(val, str):
        return "'" + val.replace('\'','\'\'') + "'"
    else:
        return str(val)

def get_insert_string (table_name, rows, columns = ""):
    return f"INSERT INTO {table_name} {columns} VALUES\n\t" + ',\n\t'.join((
            "(" + (",".join((process_value(val) for val in cell))) + ")"
            for cell in rows
        )) + ";\n"


def main():
    members = []
    truths = []
    lies = []
    rps_moves = []
    hangman_phrases = []

    with open(FILE_PATH, 'r') as csvfile, open(OUTFILE_PATH, 'w') as outfile:
        # read
        csvreader = csv.reader(csvfile)
        next(csvreader)
        for index, row in enumerate(csvreader):
            members.append([index] + row[1:8] + set_blank_fields_to_null(row[13:], 3))
            truths.append([index, row[8]])
            truths.append([index, row[9]])
            lies.append([index, row[10]])
            rps_moves.append([index, row[11]])
            hangman_phrases.append([index, row[12]])
        
        # write
        outfile.write(get_insert_string("members", members))
        outfile.write(get_insert_string("truths", truths, "(member_id, truth)"))
        outfile.write(get_insert_string("lies", lies))
        outfile.write(get_insert_string("rock_paper_scissors", rps_moves))
        outfile.write(get_insert_string("hangman_phrases", hangman_phrases))

if __name__ == '__main__':
    main()