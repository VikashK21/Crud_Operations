const fs = require('fs');
const { type } = require('os');

console.log(`1. Login           2. Signup\n3. Update          4. Delete`);
if (!fs.existsSync('crud_operations.json')){
    fs.writeFileSync('crud_operations.json', JSON.stringify([]));
}
if (fs.existsSync('crud_operations.json')){
    var loaded = fs.readFileSync('crud_operations.json', 'utf-8');
    if (loaded.length==0){
        fs.writeFileSync('crud_operations.json', JSON.stringify([]));
    }
}

var loaded_data = JSON.parse(fs.readFileSync('crud_operations.json', 'utf-8'))
////bringing the data
var opt = (require('readline-sync')).question('Type the option: ')

function login(email, pass=0) {
    if (email==null){
        var email = (require('readline-sync')).question('Enter your gmail address: ')
        var pass = (require('readline-sync')).question('Enter the password: ')
    }
    var n = -1
    for (item of loaded_data) {
        n++
        if (item['Gmail'] === email) {
            if (item['Password'] === pass) {
                return n;
            }  
        } 
    }
    return 'Gmail or Password is wrong!!'
}

function signup() {
    var name = (require('readline-sync')).question('Enter your full name: ')
    var email = (require('readline-sync')).question('Enter your gmail address: ')
    if (email.includes('@gmail.com')) {
        var pass = (require('readline-sync')).question('Create a strong password: ')
        if (pass.length >= 8) {
            let verify=login(email, pass)
            if (typeof verify !== 'number'){
                return {
                    "Gmail": email,
                    "Password": pass,
                    "Name": name
                }
            }
            else{
                return 'This Gmail and Password is already there!!'
            }    
        }
        else{
            return 'Password is not strong!!'
        }
    }else{
        return 'Invalid Gmail address!!'
    }
}
var result;
if (opt == 1) {
    result = login(null)
    if (typeof result === 'number') {
        console.log(`\n${loaded_data[result]['Name']} welcome to this page.\n`);
    }
    else {
        console.log(result);
    }
}

else if (opt == 2) {
    result = signup()
    if (typeof result === 'object'){
        loaded_data.push(result);
        fs.writeFileSync('crud_operations.json', JSON.stringify(loaded_data, null, 4));
        console.log('\nYou are Signed Up Successfully\n');
    }
    else{
        console.log(`\n${result}\n`);
    }
}

else if (opt == 3) {
    while (true) {
        result = login(null)
        if (typeof result === 'number') {
            console.log(`\n${loaded_data[result]['Name']} update your account.\n`);
            break
        }
        else {
            console.log('\nTry again!!\n');
        }
    }
    while (true){
        let data = signup()
        if (typeof data === 'object'){
            loaded_data.splice(result, 1, data)
            fs.writeFileSync('crud_operations.json', JSON.stringify(loaded_data, null, 4));
            console.log("\nYour account successfully updated.\n");
            break
        }
        else{
            console.log(data);
            console.log('\nTry again!!\n');
        }
    }
}

else if (opt == 4) {
    while (true) {
        result = login(null)
        if (typeof result === 'number') {
            console.log(`\n${loaded_data[result]['Name']} your account is no more.\n`);
            loaded_data.splice(result, 1)
            break
        }
        else {
            console.log('\nTry again!!\n');
        }
    }
    fs.writeFileSync('crud_operations.json', JSON.stringify(loaded_data, null, 4));
}
