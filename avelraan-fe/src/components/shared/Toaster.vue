<template>
    <b-toast :id="id"
             no-fade
             :auto-hide-delay="delay"
             no-close-button
             :variant="variant"
    >
        <template #toast-title>
            <div class="d-flex w-100 justify-content-between align-items-center">
                <strong>{{ title }}</strong>
                <span style="font-family: -apple-system"
                      class="px-1"
                      role="button"
                      @click="hideToast"
                >
                    &times;
                </span>
            </div>
        </template>

        {{ text }}
    </b-toast>
</template>

<script>
export default {
    name: "Toaster",
    props: {
        id: {
            type: String,
            required: true
        },
        variant: {
            type: String,
            default: 'danger'
        },
        title: {
            type: String,
            default: 'Error'
        },
        text: {
            type: String,
            required: true
        },
        delay: {
            type: Number,
            default: 5000
        }
    },
    methods: {
        hideToast() {
            this.$bvToast.hide(this.id);
        }
    }
}
</script>

<style scoped>

</style>