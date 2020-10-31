<template>
    <div class="GroupCheckBody" :key="name">
        <div :key="type" class=" border-bottom border-secondary" v-for="(mergedChecks, type) in typed">
<!--    <tbody :key="type" class="border-bottom border-secondary" v-for="(mergedChecks, type) in typed">-->
            <check  v-for="(checkSet, mergedDesc, idx) in mergedChecks"
                    :name="name"
                    :key="mergedDesc"
                    :idx="idx"
                    :rowspan="Object.keys(mergedChecks).length"
            />
<!--    <tr :key="mergedDesc" v-for="(checkSet, mergedDesc, idx) in mergedChecks">-->
<!--        <td :rowspan="Object.keys(mergedChecks).length" class="align-middle border-right" v-if="idx === 0">-->
<!--            <img :src="'images/' + type + '.svg'" :title="type" height="20px">-->
<!--        </td>-->
<!--        <td :rowspan="Object.keys(mergedChecks).length" class="align-middle border-right w-10"-->
<!--            v-if="idx === 0">-->
<!--            <span :id="name" class="badge badge-secondary">{{ shortHand(name, nsLimit) }}</span>-->
<!--            <b-tooltip :target="name" triggers="hover" v-if="name.length > nsLimit" variant="secondary">-->
<!--                {{name}}-->
<!--            </b-tooltip>-->
<!--        </td>-->
<!--        <td class="align-middle w-25">-->
<!--              <span :class="{'font-italic': mergedDesc.startsWith('multiple')}" :id="calcTooltipId(mergedDesc, name, type)"-->
<!--                    class="float-left w-75 pr-5">-->
<!--                {{ shortHand(mergedDesc, descLimit) }}-->
<!--              </span>-->
<!--            <b-tooltip :disabled="mergedDesc.length <= descLimit"-->
<!--                       :target="calcTooltipId(mergedDesc, name, type)" triggers="hover" variant="secondary">-->
<!--                <div class="description">{{mergedDesc}}</div>-->
<!--            </b-tooltip>-->
<!--            <b-tooltip-->
<!--                    :disabled="!mergedDesc.startsWith('multiple')"-->
<!--                    :target="calcTooltipId(mergedDesc, name, type)"-->
<!--                    triggers="hover"-->
<!--                    variant="secondary">-->
<!--                <div :key="check.key" class="description" v-for="check in checkSet">{{check.description}}-->
<!--                </div>-->
<!--            </b-tooltip>-->
<!--            <button @click="triggerMerged(checkSet, $event)"-->
<!--                    class="btn btn-info btn-xs float-right check-button" title="Trigger the check on every server">-->
<!--                &lt;!&ndash;              <i class="material-icons md-12 align-middle">send</i>&ndash;&gt;-->
<!--                <send-icon class="material-icons md-12 align-middle">send</send-icon>-->
<!--            </button>-->
<!--        </td>-->
<!--        &lt;!&ndash;                    <td :key="server" class="align-top border-right border-left" v-for="server in serversByNames">&ndash;&gt;-->
<!--        &lt;!&ndash;                        <check-set-tds :check-set="checkSet" :server="server"></check-set-tds>&ndash;&gt;-->
<!--        &lt;!&ndash;                    </td>&ndash;&gt;-->
<!--        <td v-for="server in serversByNames" :key="server" class="align-top border-right border-left">-->
<!--            <div>-->
<!--                <status-strip  :check-set="checkSet" :server="server"-->
<!--                               color="#28a745" error-color="#dc3545"-->
<!--                               :bar-width="20" :bar-spacing="5" :barMaxHeight="20"-->
<!--                               :zoominess="0.85"/>-->
<!--            </div>-->
<!--        </td>-->
<!--    </tr>-->
<!--    </tbody>-->
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import store from '../store'
    import Check from "./Check";

    export default {
        name: "GroupCheck",
        components: {

            Check,
        },
        props: {
            name: {
                type: String,
                required: true,
            },
            typed: {
                type: Object,
                required: true,
            },
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
            shortHand() {
                return (txt, limit) => {
                    return txt.slice(0, limit) + (txt.length > limit ? "..." : "");
                }
            },
            calcTooltipId() {
                return (mergedDesc, name, type) => {
                    return window.btoa(mergedDesc + name + type)
                }
            },
        },

    }
</script>

<style scoped>
    .GroupCheckBody
    {
        display: table-row-group;
    }
</style>