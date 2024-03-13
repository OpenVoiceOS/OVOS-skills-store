// scripts.js

new Vue({
    el: '#app',
    data: {
        skills: []
    },
    mounted() {
        this.fetchSkills();
    },
    methods: {
        fetchSkills() {
            fetch('https://openvoiceos.github.io/OVOS-skills-store/skills.json')
                .then(response => response.json())
                .then(data => {
                    this.skills = data.items;
                })
                .catch(error => console.error('Error fetching skills:', error));
        }
    }
});
