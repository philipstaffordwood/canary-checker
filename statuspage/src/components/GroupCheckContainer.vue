<template>
<!--    <table class="table table-sm table-fixed text-nowrap" id="checks" v-cloak>-->
    <div v-cloak class="Table table-sm table-fixed text-nowrap" id="checks">
        <div class="TableHeader">
            <tr>
            <th class="border-right">Type</th>
            <th class="border-right">NS/Name</th>
            <th class="border-right">Description</th>
            <th :key="server" class="border-right" v-for="(server, serverName) in serversByNames">{{ serverName }}</th>
            </tr>
        </div>
        <template v-for="(typed, name) in groupedChecks">
            <group-check :typed="typed" :name="name" :key="name"/>
        </template>
<!--    </table>-->
    </div>
</template>

<script>
    import Vuex from 'vuex'

    import store from '../store'
    import GroupCheck from "./GroupCheck";


    export default {
        name: "GroupCheckContainer",
        components: {
            GroupCheck,
        },
        store: store,
        data() {
            return {
                descLimit: 41,
                nsLimit: 31
            }
        },
        computed: {
            ...Vuex.mapState(['error', 'servers', 'lastRefreshed', 'checks', 'disableReload']),
            ...Vuex.mapGetters(['serversByNames', 'groupedChecks']),

        },
        methods: {
            async triggerMerged(checks, event) {
                const btn = event.currentTarget
                btn.classList.toggle("btn-light")
                await this.$store.dispatch('triggerMergedChecks', checks)
                await this.$store.dispatch('fetchData')
                btn.classList.toggle("btn-light")
            }
        }

    }
</script>

<style scoped>
    .Table
    {
        display: table;
    }
    .TableHeader
    {
        display: table-header-group;
    }


</style>