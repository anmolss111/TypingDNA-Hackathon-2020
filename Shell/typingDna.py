import json, sys, requests

command = sys.argv[1]

basePath = '/Users/anmolsuri/Documents/Develpoment/Hackathons/2020/typingDNA/Shell'

with open(basePath + '/.test.txt') as f:
    data = json.load(f)

commands = []
for dataElement in data:

    commands.append(dataElement['name'].lower())

if(command.lower() in commands):

    print('Error: Please verify command with typing dna application')

if(command.lower() == 'exit'):

    print('Error: Cannot Exit this Bash')

if('typing-dna-auth' in command.lower()):

    commandSplit = command.split()

    data = {

        'accessToken': commandSplit[1]
    }
    r = requests.post('http://localhost:8000/backend/command/verify', json=data)

    if(r.status_code == 200):

        returnCommand = ''
        for i in range(2,len(commandSplit)):

            returnCommand += commandSplit[i] + ' '

        print(returnCommand)

    else:

        print('Error: Cannot Verify the Access Token for the Command')

if('typingdna' in command.lower()):

    print('Error: Cannot Run this Command')
