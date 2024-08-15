import { Account, Client, ID } from 'appwrite'
import Config from 'react-native-config'

import Snackbar from 'react-native-snackbar'

const appwriterClient = new Client()

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PORJECTID: string = Config.APPWRITE_PORJECTID!;


type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
}

type LoginUserAccount = {
    email: string;
    password: string;
}

class AppwriteService {
    account;

    constructor(){
        appwriterClient
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PORJECTID)

        this.account = new Account(appwriterClient)
    }

    //create a new record of user inside appwrite

    async  createAccount({email, password, name}: CreateUserAccount){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (userAccount) {
                //If you want to logged in just after sign up
                return this.login({email, password}) //TODO: create login feature
            } else {
                return userAccount
            }
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite service :: createAccount :: " + error)
        }
    }

    async login({email, password}: LoginUserAccount){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite service :: loginAccount :: " + error)
        
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite service :: getCurrentUser :: " + error)
        
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite service :: logout :: " + error)
        
        }
    }
}

export default AppwriteService 