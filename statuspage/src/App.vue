<template>
    <div class="ml-4 mr-4" id="app">

        <auto-update-settings/>

        <h1>Canary Checker</h1>

        <hr>

        <error-panel :error="error"/>

        <group-check-container />

        <div id="last-refreshed" v-cloak v-if="lastRefreshed">
            Last refreshed <span>{{ lastRefreshed }}</span>
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex'

    import store from './store'
    import AutoUpdateSettings from './components/AutoUpdateSettings.vue'
    import ErrorPanel from './components/ErrorPanel.vue'
    import GroupCheckContainer from "./components/GroupCheckContainer";


    export default {
        name: 'App',
        components: {
            AutoUpdateSettings,
            ErrorPanel,
            GroupCheckContainer

        },
        store: store,
        created() {
            this.$store.dispatch('fetchData')
            this.$store.dispatch('resumeAutoUpdate')
        },
      computed: {
            ...Vuex.mapState(['error']),
        },
        methods: {
            ...Vuex.mapActions(['pauseAutoUpdate', 'resumeAutoUpdate']),
         }
    }
</script>

<style>
    body {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    h3 {
        margin-top: 2rem;
    }

    .popover > h3 {
        margin-top: 0rem;
    }

    .popover-body > hr {
        margin: 0.4rem 0;
    }

    .popover-header > .description {
        font-size: 0.75rem;
    }

    .tooltip-inner > .description {
        font-size: 0.6rem;
    }

    .row {
        margin-bottom: 1rem;
    }

    .row .row {
        margin-top: 1rem;
        margin-bottom: 0;
    }

    [class*="col-"] {
        padding-top: 1rem;
        padding-bottom: 1rem;
        background-color: rgba(86, 61, 124, .15);
        border: 1px solid rgba(86, 61, 124, .2);
    }

    hr {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

    #last-refreshed {
        color: #777;
        font-size: 0.8em;
    }

    div.check-status-container {
        display: inline-block;
        vertical-align: middle;
    }


    .btn-group-xs > .btn, .btn-xs {
        padding: .25rem .4rem;
        font-size: .875rem;
        line-height: .75;
        border-radius: .2rem;
    }

    [v-cloak] {
        display: none;
    }

    .material-icons.md-18 {
        font-size: 18px
    }

    .material-icons.md-14 {
        font-size: 14px
    }

    .material-icons.md-12 {
        font-size: 12px
    }

    .w-10 {
        width: 10% !important;
    }


    .group-section {
        width: 150px
    }


    .check-section-header {
        height: 1.5rem;
    }

    .slide-enter {
        opacity: 0;
    }

    .slide-enter-active {
        transition: all 0.5s ease-out;
    }

    .slide-leave-active {
        transition: opacity 300ms ease-out;
    }

    .slide-leave {
        opacity: 0;
    }

    .slide-move {
        transition: all 250ms ease-in;
    }

    .check-button {
        transition: all 0.4s linear;
        transition-property: color, background-color, border-color
    }


</style>
