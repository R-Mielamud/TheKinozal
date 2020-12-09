import random

LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

def generate_random_string(length=8, letters=LETTERS):
    string = ""

    for i in range(length):
        random_index = random.randint(0, len(LETTERS) - 1)
        letter = LETTERS[random_index]
        string += letter

    return string
