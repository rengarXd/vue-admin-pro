import Button from './Button/index.vue';

const components = {
    Button,
};

const install = function (Vue, opts = {}) {
    if (install.installed) { return false; }
    Object.keys(components).forEach(component => Vue.component(component, components[component]));
}

const API = {
    install,
    ...components,
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default API;
