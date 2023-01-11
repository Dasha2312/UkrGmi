<template>
    <div>
        <canvas id="email-chart"></canvas>
    </div>
</template>
<script>
import Chart from 'chart.js/auto'


export default {
    name: 'EmailChart',
    async mounted() {
        await this.createChart();
    },
    props: {
        CommentsEmailLength: {
            type: Array,
        }
    },
    methods: {
        async createChart() {
            const ctx = document.getElementById('email-chart');
            const labels_name = [];
            const data_value = [];
            const d =  await this.labelsNames();
            d.forEach(function(value, key) {
                labels_name.push(key);
                data_value.push(value)
            })
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels_name,
                    datasets: [
                        {
                            label: "Email count",
                            type: "bar",
                            data: data_value,
                            backgroundColor: "rgba(71, 183,132,.5)",
                            borderColor: "#47b784",
                            borderWidth: 3
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                },
            });
        },
        async labelsNames() {
            let labelsNames = [];
            const resp = await this.CommentsEmailLength;
            resp.forEach(function(value,key) {
                labelsNames.push(value)
                // console.log('key = ' + key +', value = ' + value);
            });
            console.log(labelsNames)
            return labelsNames;
        }
    },
    watch: {
        async CommentsEmailLength() {
            await this.labelsNames()
        }
    },

}
</script>
<style lang="">
    
</style>