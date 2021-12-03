<template>
<div class="h-100">

<!--    Welcome screen-->
    <div v-if="isSignedIn" class="h-100 d-flex flex-column justify-content-between">
        <h5 class="text-center text-av-light-yellow py-5">Welcome, {{ playerName }}!</h5>
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
        <b-row class="mt-4">
            <b-col cols="12" sm="8" md="6" class="mx-auto">
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
                        <b-tooltip v-else target="symbol-select" placement="right">
                            Please use the same symbol you chose when signing up.
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
                              :disabled="actionButtonIsDisabled"
                              @click="authenticateUser"
                    >
                        <div v-if="signInLoading" class="d-flex align-items-center py-1 px-2">
                            <b-spinner small></b-spinner>
                        </div>
                        <span v-else>{{ tab }}</span>
                    </b-button>
                </div>
            </b-col>
        </b-row>
    </div>

</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const SIGN_IN = 'Sign in', SIGN_UP = 'Sign up';
const EPSILON = 'Epsilon', OMICRON = 'Omicron', SIGMA = 'Sigma';

export default {
    name: "Home",
    data() {
        return {
            tab: SIGN_IN,
            options: { SIGN_IN, SIGN_UP },
            symbolOptions: [
                { value: null, text: 'Please select a symbol' },
                { value: EPSILON, text: 'Epsilon ε' },
                { value: OMICRON, text: 'Omicron ο' },
                { value: SIGMA, text: 'Sigma σ' }
            ],
            selectedSymbol: null,
            username: null,
            password: null,
            passwordConfirmed: null
        }
    },
    computed: {
        ...mapState({
            isSignedIn: state => state.playerData.isSignedIn,
            signInLoading: state => state.playerData.signInLoading,
            signInError: state => state.playerData.signInError,
            playerName: state => state.playerData.playerName,
        }),
        isSignUpTab() {
            return this.tab === SIGN_UP;
        },
        actionButtonIsDisabled() {
            const signInInputsFilled = this.selectedSymbol && this.username && this.password;
            const anyInputIsMissing = this.tab === SIGN_IN ? !signInInputsFilled : !(signInInputsFilled && this.passwordConfirmed);
            return anyInputIsMissing || this.signInLoading;
        },
        usernameIsValid() {
            return this.username ? this.username.length <= 50 : null;
        },
        passwordIsValid() {
            return this.password ? /^[a-z0-9]{4}$/i.test(this.password) : null;
        },
        confirmedPasswordIsValid() {
            return this.passwordConfirmed ? this.password === this.passwordConfirmed : null;
        }
    },
    methods: {
        ...mapActions({
            signIn: 'playerData/signIn'
        }),
        logOut() {

        },
        authenticateUser() {
            if (this.tab === SIGN_IN) {
                this.signIn({
                    "PlayerName": this.username,
                    "Ward": this.password,
                    "Symbol": this.selectedSymbol
                });
            }
            else this.signUp({
                "PlayerName": this.username,
                "Ward": this.password,
                "Wardcheck": this.passwordConfirmed,
                "Symbol": this.selectedSymbol
            });
        },
    }
}
</script>

<style scoped>

</style>