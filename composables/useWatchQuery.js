import { watchDebounced } from '@vueuse/core';

export const useWatchQuery = (onChange, config = { watchOnly: [], ignore: [], debounce: 200 }) => {
    const route = useRoute();

    // Compute the filtered query based on the configuration
    const getQuery = computed(() => {
        let query = { ...route.query };

        if (config.ignore?.length) {
            // Ignore specific keys
            config.ignore.forEach((item) => {
                delete query[item];
            });
        }

        if (config.watchOnly?.length) {
            // Include only specified keys
            query = Object.fromEntries(
                Object.entries(query).filter(([key]) => config.watchOnly.includes(key))
            );
        }

        return query;
    });

    // Watch for changes with debouncing
    watchDebounced(
        getQuery,
        (value, oldValue) => {
            if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
                onChange(value, oldValue);
            }
        },
        { debounce: config.debounce, deep: true }
    );
};
