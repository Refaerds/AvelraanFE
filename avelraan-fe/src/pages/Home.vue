<template>
<div class="h-100">

<!--    Welcome screen-->
    <div v-if="isUserSignedIn" class="h-100 d-flex flex-column justify-content-between">
        <h5 class="text-center text-av-light-yellow py-5">Welcome, {{ userName }}!</h5>
        <div class="text-right">
            <b-button variant="danger" @click="logOut">Log out</b-button>
        </div>
    </div>

<!--    Sign in / Sing up-->
    <div v-else class>
        <b-nav align="right">
            <b-nav-item @click="tab = options.SIGN_IN" :active="!isSignUpTab">Sign In</b-nav-item>
            <b-nav-item @click="tab = options.SIGN_UP" :active="isSignUpTab">Sign Up</b-nav-item>
        </b-nav>
        <div class="mx-auto w-50 mt-4" style="min-width: 200px;">
            <b-row class="mb-3">
                <b-col cols="4" class="d-flex align-items-center">
                    <label>Symbol</label>
                </b-col>
                <b-col cols="8">
                    <b-select size="sm" autofocus
                              id="symbol-select"
                              :options="symbolOptions"
                              v-model="selectedSymbol"
                    ></b-select>
                    <b-tooltip v-if="isSignUpTab" target="symbol-select" placement="right">
                        Selecting a symbol is an additional security step in your authentication.
                        Please remember the symbol you've chosen initially, and always use it when signing in.
                    </b-tooltip>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col cols="4" class="d-flex align-items-center">
                    <label>Username</label>
                </b-col>
                <b-col cols="8">
                    <b-input type="text" size="sm"
                             placeholder="Please enter your username"
                             trim
                             :state="usernameIsValid"
                             v-model="username"
                    ></b-input>
                    <b-form-invalid-feedback>
                        The username should not exceed 50 characters.
                    </b-form-invalid-feedback>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col cols="4" class="d-flex align-items-center">
                    <label>PowerWard</label>
                </b-col>
                <b-col cols="8">
                    <b-input type="password" size="sm"
                             placeholder="Please enter your password"
                             trim
                             :state="passwordIsValid"
                             v-model="password"
                    ></b-input>
                    <b-form-invalid-feedback>
                        The password should not exceed 4 characters, and may contain only latin letters and numbers.
                    </b-form-invalid-feedback>
                </b-col>
            </b-row>
            <b-row class="mb-3" v-if="isSignUpTab">
                <b-col cols="4" class="d-flex align-items-center">
                    <label>Confirm PowerWard</label>
                </b-col>
                <b-col cols="8">
                    <b-input type="password" size="sm"
                             placeholder="Please enter your password again"
                             trim
                             :state="confirmedPasswordIsValid"
                             v-model="passwordConfirmed"
                    ></b-input>
                    <b-form-invalid-feedback>
                        The passwords don't match.
                    </b-form-invalid-feedback>
                </b-col>
            </b-row>
            <div class="text-right">
                <b-button variant="success"
                          :disabled="anyInputMissing"
                          @click="authenticateUser"
                >
                    {{ tab }}
                </b-button>
            </div>
        </div>
    </div>

</div>
</template>

<script>
const SIGN_IN = 'Sign in', SIGN_UP = 'Sign up';

export default {
    name: "Home",
    data() {
        return {
            tab: SIGN_IN,
            options: { SIGN_IN, SIGN_UP },
            symbolOptions: [
                { value: null, text: 'Please select a symbol' },
                { value: 'epsilon', text: 'Epsilon ε' },
                { value: 'omicron', text: 'Omicron ο' },
                { value: 'sigma', text: 'Sigma σ' }
            ],
            selectedSymbol: null,
            username: null,
            password: null,
            passwordConfirmed: null
        }
    },
    computed: {
        userName() {
            return 'Marina'
        },
        isUserSignedIn() {
            return false;
        },
        isSignUpTab() {
            return this.tab === SIGN_UP;
        },
        anyInputMissing() {
            const signInInputsFilled = this.selectedSymbol && this.username && this.password;
            return this.tab === SIGN_IN ? !signInInputsFilled : !(signInInputsFilled && this.passwordConfirmed);
        },
        usernameIsValid() {
            return this.username ? this.username.length <= 50 : null;
        },
        passwordIsValid() {
            return this.password ? /^[a-z0-9]{1,4}$/i.test(this.password) : null;
        },
        confirmedPasswordIsValid() {
            return this.passwordConfirmed ? this.password === this.passwordConfirmed : null;
        }
    },
    methods: {
        logOut() {

        },
        authenticateUser() {

        }
    }
}
</script>

<style scoped>

</style>