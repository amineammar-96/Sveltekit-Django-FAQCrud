
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    

    function ___$insertStyle(css) {
        if (!css || typeof window === 'undefined') {
            return;
        }
        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = css;
        document.head.appendChild(style);
        return css;
    }

    function noop$1() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop$1;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function select_option(select, value, mounting) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        if (!mounting || value !== undefined) {
            select.selectedIndex = -1; // no option should be selected
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked');
        return selected_option && selected_option.__value;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    /**
     * Associates an arbitrary `context` object with the current component and the specified `key`
     * and returns that object. The context is then available to children of the component
     * (including slotted content) with `getContext`.
     *
     * Like lifecycle functions, this must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-setcontext
     */
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    /**
     * Retrieves the context that belongs to the closest parent component with the specified `key`.
     * Must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-getcontext
     */
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop$1,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop$1;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop$1;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.58.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    function construct_svelte_component_dev(component, props) {
        const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
        try {
            const instance = new component(props);
            if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
                throw new Error(error_message);
            }
            return instance;
        }
        catch (err) {
            const { message } = err;
            if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
                throw new Error(error_message);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop$1) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop$1) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop$1;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0 && stop) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let started = false;
            const values = [];
            let pending = 0;
            let cleanup = noop$1;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop$1;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (started) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            started = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
                // We need to set this to false because callbacks can still happen despite having unsubscribed:
                // Callbacks might already be placed in the queue which doesn't know it should no longer
                // invoke this derived store.
                started = false;
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    function startsWith(string, search) {
      return string.substr(0, search.length) === search;
    }

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match$2(route, uri) {
      return pick([route], uri);
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    function addQuery(pathname, query) {
      return pathname + (query ? `?${query}` : "");
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
      // /foo/bar, /baz/qux => /foo/bar
      if (startsWith(to, "/")) {
        return to;
      }

      const [toPathname, toQuery] = to.split("?");
      const [basePathname] = base.split("?");
      const toSegments = segmentize(toPathname);
      const baseSegments = segmentize(basePathname);

      // ?a=b, /users?b=c => /users?a=b
      if (toSegments[0] === "") {
        return addQuery(basePathname, toQuery);
      }

      // profile, /users/789 => /users/789/profile
      if (!startsWith(toSegments[0], ".")) {
        const pathname = baseSegments.concat(toSegments).join("/");

        return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
      }

      // ./       , /users/123 => /users/123
      // ../      , /users/123 => /users
      // ../..    , /users/123 => /
      // ../../one, /a/b/c/d   => /a/b/one
      // .././one , /a/b/c/d   => /a/b/c/one
      const allSegments = baseSegments.concat(toSegments);
      const segments = [];

      allSegments.forEach(segment => {
        if (segment === "..") {
          segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });

      return addQuery("/" + segments.join("/"), toQuery);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
      );
    }

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.58.0 */

    function create_fragment$g(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let $location;
    	let $routes;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, 'routes');
    	component_subscribe($$self, routes, value => $$invalidate(6, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(5, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(7, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match$2(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ['basepath', 'url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		derived,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		pick,
    		match: match$2,
    		stripSlashes,
    		combinePaths,
    		basepath,
    		url,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$location,
    		$routes,
    		$base
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 128) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			{
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 96) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [
    		routes,
    		location,
    		base,
    		basepath,
    		url,
    		$location,
    		$routes,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.58.0 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 4,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[2],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block$4(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$3, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block$2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, routeParams, $location*/ 532)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[2],
    		/*routeProps*/ ctx[3]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 28)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
    					dirty & /*routeParams*/ 4 && get_spread_object(/*routeParams*/ ctx[2]),
    					dirty & /*routeProps*/ 8 && get_spread_object(/*routeProps*/ ctx[3])
    				])
    			: {};

    			if (dirty & /*component*/ 1 && switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(1, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway.
    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('path' in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		LOCATION,
    		path,
    		component,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('routeParams' in $$props) $$invalidate(2, routeParams = $$new_props.routeParams);
    		if ('routeProps' in $$props) $$invalidate(3, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 2) {
    			if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(2, routeParams = $activeRoute.params);
    			}
    		}

    		{
    			const { path, component, ...rest } = $$props;
    			$$invalidate(3, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		$activeRoute,
    		routeParams,
    		routeProps,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Link.svelte generated by Svelte v3.58.0 */
    const file$c = "node_modules/svelte-routing/src/Link.svelte";

    function create_fragment$e(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{ "aria-current": /*ariaCurrent*/ ctx[2] },
    		/*props*/ ctx[1],
    		/*$$restProps*/ ctx[6]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$c, 40, 0, 1249);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*onClick*/ ctx[5], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				(!current || dirty & /*ariaCurrent*/ 4) && { "aria-current": /*ariaCurrent*/ ctx[2] },
    				dirty & /*props*/ 2 && /*props*/ ctx[1],
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let ariaCurrent;
    	const omit_props_names = ["to","replace","state","getProps"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $location;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link', slots, ['default']);
    	let { to = "#" } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = () => ({}) } = $$props;
    	const { base } = getContext(ROUTER);
    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(14, $base = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(13, $location = value));
    	const dispatch = createEventDispatcher();
    	let href, isPartiallyCurrent, isCurrent, props;

    	function onClick(event) {
    		dispatch("click", event);

    		if (shouldNavigate(event)) {
    			event.preventDefault();

    			// Don't push another entry to the history stack when the user
    			// clicks on a Link to the page they are currently on.
    			const shouldReplace = $location.pathname === href || replace;

    			navigate(href, { state, replace: shouldReplace });
    		}
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('to' in $$new_props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$new_props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$new_props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$new_props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('$$scope' in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		createEventDispatcher,
    		ROUTER,
    		LOCATION,
    		navigate,
    		startsWith,
    		resolve,
    		shouldNavigate,
    		to,
    		replace,
    		state,
    		getProps,
    		base,
    		location,
    		dispatch,
    		href,
    		isPartiallyCurrent,
    		isCurrent,
    		props,
    		onClick,
    		ariaCurrent,
    		$location,
    		$base
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('to' in $$props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('isPartiallyCurrent' in $$props) $$invalidate(11, isPartiallyCurrent = $$new_props.isPartiallyCurrent);
    		if ('isCurrent' in $$props) $$invalidate(12, isCurrent = $$new_props.isCurrent);
    		if ('props' in $$props) $$invalidate(1, props = $$new_props.props);
    		if ('ariaCurrent' in $$props) $$invalidate(2, ariaCurrent = $$new_props.ariaCurrent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*to, $base*/ 16512) {
    			$$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
    		}

    		if ($$self.$$.dirty & /*$location, href*/ 8193) {
    			$$invalidate(11, isPartiallyCurrent = startsWith($location.pathname, href));
    		}

    		if ($$self.$$.dirty & /*href, $location*/ 8193) {
    			$$invalidate(12, isCurrent = href === $location.pathname);
    		}

    		if ($$self.$$.dirty & /*isCurrent*/ 4096) {
    			$$invalidate(2, ariaCurrent = isCurrent ? "page" : undefined);
    		}

    		if ($$self.$$.dirty & /*getProps, $location, href, isPartiallyCurrent, isCurrent*/ 15361) {
    			$$invalidate(1, props = getProps({
    				location: $location,
    				href,
    				isPartiallyCurrent,
    				isCurrent
    			}));
    		}
    	};

    	return [
    		href,
    		props,
    		ariaCurrent,
    		base,
    		location,
    		onClick,
    		$$restProps,
    		to,
    		replace,
    		state,
    		getProps,
    		isPartiallyCurrent,
    		isCurrent,
    		$location,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {
    			to: 7,
    			replace: 8,
    			state: 9,
    			getProps: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get to() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set to(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProps() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getProps(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Navbar.svelte generated by Svelte v3.58.0 */
    const file$b = "src/components/Navbar.svelte";

    // (61:10) {#if loggedIn}
    function create_if_block_2$1(ctx) {
    	let li;
    	let link;
    	let current;

    	link = new Link({
    			props: {
    				to: "/dashboard",
    				class: "nav-link text-dark",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link.$on("click", /*updateCurrentPath*/ ctx[2]);

    	const block = {
    		c: function create() {
    			li = element("li");
    			create_component(link.$$.fragment);
    			attr_dev(li, "class", "nav-item svelte-1teqv7");
    			toggle_class(li, "active", /*currentPath*/ ctx[1] === "/dashboard");
    			add_location(li, file$b, 61, 10, 1528);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(link, li, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const link_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);

    			if (!current || dirty & /*currentPath*/ 2) {
    				toggle_class(li, "active", /*currentPath*/ ctx[1] === "/dashboard");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(link);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(61:10) {#if loggedIn}",
    		ctx
    	});

    	return block;
    }

    // (63:12) <Link on:click={updateCurrentPath} to="/dashboard" class="nav-link text-dark">
    function create_default_slot_7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Dashboard");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(63:12) <Link on:click={updateCurrentPath} to=\\\"/dashboard\\\" class=\\\"nav-link text-dark\\\">",
    		ctx
    	});

    	return block;
    }

    // (67:12) <Link on:click={updateCurrentPath} to="/" class="nav-link text-dark">
    function create_default_slot_6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Accueil");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(67:12) <Link on:click={updateCurrentPath} to=\\\"/\\\" class=\\\"nav-link text-dark\\\">",
    		ctx
    	});

    	return block;
    }

    // (70:12) <Link on:click={updateCurrentPath} to="/faq" class="nav-link text-dark">
    function create_default_slot_5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("FAQ");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(70:12) <Link on:click={updateCurrentPath} to=\\\"/faq\\\" class=\\\"nav-link text-dark\\\">",
    		ctx
    	});

    	return block;
    }

    // (82:10) {#if !loggedIn}
    function create_if_block_1$2(ctx) {
    	let li;
    	let link;
    	let current;

    	link = new Link({
    			props: {
    				to: "/signup",
    				class: "nav-link text-dark",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link.$on("click", /*updateCurrentPath*/ ctx[2]);

    	const block = {
    		c: function create() {
    			li = element("li");
    			create_component(link.$$.fragment);
    			attr_dev(li, "class", "nav-item svelte-1teqv7");
    			toggle_class(li, "active", /*currentPath*/ ctx[1] === "/signup");
    			add_location(li, file$b, 82, 12, 2429);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(link, li, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const link_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);

    			if (!current || dirty & /*currentPath*/ 2) {
    				toggle_class(li, "active", /*currentPath*/ ctx[1] === "/signup");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(link);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(82:10) {#if !loggedIn}",
    		ctx
    	});

    	return block;
    }

    // (84:14) <Link to="/signup" on:click={updateCurrentPath} class="nav-link text-dark">
    function create_default_slot_4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Inscription");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(84:14) <Link to=\\\"/signup\\\" on:click={updateCurrentPath} class=\\\"nav-link text-dark\\\">",
    		ctx
    	});

    	return block;
    }

    // (87:10) {#if !loggedIn}
    function create_if_block$3(ctx) {
    	let li;
    	let link;
    	let current;

    	link = new Link({
    			props: {
    				to: "/login",
    				class: "nav-link text-dark",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link.$on("click", /*updateCurrentPath*/ ctx[2]);

    	const block = {
    		c: function create() {
    			li = element("li");
    			create_component(link.$$.fragment);
    			attr_dev(li, "class", "nav-item svelte-1teqv7");
    			toggle_class(li, "active", /*currentPath*/ ctx[1] === "/login");
    			add_location(li, file$b, 87, 12, 2672);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(link, li, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const link_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);

    			if (!current || dirty & /*currentPath*/ 2) {
    				toggle_class(li, "active", /*currentPath*/ ctx[1] === "/login");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(link);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(87:10) {#if !loggedIn}",
    		ctx
    	});

    	return block;
    }

    // (89:14) <Link to="/login" on:click={updateCurrentPath} class="nav-link text-dark">
    function create_default_slot_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Connexion");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(89:14) <Link to=\\\"/login\\\" on:click={updateCurrentPath} class=\\\"nav-link text-dark\\\">",
    		ctx
    	});

    	return block;
    }

    // (98:12) <Link to="/contact" on:click={updateCurrentPath} class="nav-link text-dark">
    function create_default_slot_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Contactez-nous");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(98:12) <Link to=\\\"/contact\\\" on:click={updateCurrentPath} class=\\\"nav-link text-dark\\\">",
    		ctx
    	});

    	return block;
    }

    // (102:12) <Link to="/chatgpt" on:click={updateCurrentPath} class="nav-link text-dark">
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("ChatGPT");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(102:12) <Link to=\\\"/chatgpt\\\" on:click={updateCurrentPath} class=\\\"nav-link text-dark\\\">",
    		ctx
    	});

    	return block;
    }

    // (41:0) <Router>
    function create_default_slot$1(ctx) {
    	let nav;
    	let div1;
    	let a0;
    	let i;
    	let t0;
    	let span0;
    	let t2;
    	let button;
    	let span1;
    	let t3;
    	let div0;
    	let ul;
    	let t4;
    	let li0;
    	let link0;
    	let t5;
    	let li1;
    	let link1;
    	let t6;
    	let t7;
    	let t8;
    	let li2;
    	let link2;
    	let t9;
    	let li3;
    	let link3;
    	let t10;
    	let li4;
    	let a1;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*loggedIn*/ ctx[0] && create_if_block_2$1(ctx);

    	link0 = new Link({
    			props: {
    				to: "/",
    				class: "nav-link text-dark",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link0.$on("click", /*updateCurrentPath*/ ctx[2]);

    	link1 = new Link({
    			props: {
    				to: "/faq",
    				class: "nav-link text-dark",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1.$on("click", /*updateCurrentPath*/ ctx[2]);
    	let if_block1 = !/*loggedIn*/ ctx[0] && create_if_block_1$2(ctx);
    	let if_block2 = !/*loggedIn*/ ctx[0] && create_if_block$3(ctx);

    	link2 = new Link({
    			props: {
    				to: "/contact",
    				class: "nav-link text-dark",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link2.$on("click", /*updateCurrentPath*/ ctx[2]);

    	link3 = new Link({
    			props: {
    				to: "/chatgpt",
    				class: "nav-link text-dark",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link3.$on("click", /*updateCurrentPath*/ ctx[2]);

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div1 = element("div");
    			a0 = element("a");
    			i = element("i");
    			t0 = text(" Yuccanleads");
    			span0 = element("span");
    			span0.textContent = "FAQ";
    			t2 = space();
    			button = element("button");
    			span1 = element("span");
    			t3 = space();
    			div0 = element("div");
    			ul = element("ul");
    			if (if_block0) if_block0.c();
    			t4 = space();
    			li0 = element("li");
    			create_component(link0.$$.fragment);
    			t5 = space();
    			li1 = element("li");
    			create_component(link1.$$.fragment);
    			t6 = space();
    			if (if_block1) if_block1.c();
    			t7 = space();
    			if (if_block2) if_block2.c();
    			t8 = space();
    			li2 = element("li");
    			create_component(link2.$$.fragment);
    			t9 = space();
    			li3 = element("li");
    			create_component(link3.$$.fragment);
    			t10 = space();
    			li4 = element("li");
    			a1 = element("a");
    			a1.textContent = "YuccanLead";
    			attr_dev(i, "class", "fa-solid fa-cloud svelte-1teqv7");
    			add_location(i, file$b, 44, 8, 1073);
    			attr_dev(span0, "class", "logoSpan svelte-1teqv7");
    			add_location(span0, file$b, 44, 51, 1116);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "navbar-brand text-dark svelte-1teqv7");
    			add_location(a0, file$b, 43, 6, 992);
    			attr_dev(span1, "class", "navbar-toggler-icon");
    			add_location(span1, file$b, 55, 8, 1334);
    			attr_dev(button, "class", "navbar-toggler");
    			attr_dev(button, "type", "button");
    			attr_dev(button, "data-toggle", "collapse");
    			attr_dev(button, "data-target", "#navbarCollapse");
    			add_location(button, file$b, 49, 6, 1188);
    			attr_dev(li0, "class", "nav-item svelte-1teqv7");
    			toggle_class(li0, "active", /*currentPath*/ ctx[1] === "/");
    			add_location(li0, file$b, 65, 10, 1741);
    			attr_dev(li1, "class", "nav-item svelte-1teqv7");
    			toggle_class(li1, "active", /*currentPath*/ ctx[1] === "/faq");
    			add_location(li1, file$b, 68, 10, 1920);
    			attr_dev(li2, "class", "nav-item svelte-1teqv7");
    			toggle_class(li2, "active", /*currentPath*/ ctx[1] === "/contact");
    			add_location(li2, file$b, 96, 10, 2916);
    			attr_dev(li3, "class", "nav-item svelte-1teqv7");
    			toggle_class(li3, "active", /*currentPath*/ ctx[1] === "/chatgpt");
    			add_location(li3, file$b, 100, 10, 3117);
    			attr_dev(a1, "href", "https://www.yuccanlead.fr/");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "class", "nav-link text-dark svelte-1teqv7");
    			add_location(a1, file$b, 106, 12, 3355);
    			attr_dev(li4, "class", "nav-item svelte-1teqv7");
    			add_location(li4, file$b, 105, 10, 3321);
    			attr_dev(ul, "class", "navbar-nav ml-auto");
    			add_location(ul, file$b, 59, 8, 1461);
    			attr_dev(div0, "id", "navbarCollapse");
    			attr_dev(div0, "class", "collapse navbar-collapse");
    			add_location(div0, file$b, 58, 6, 1394);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$b, 42, 4, 962);
    			attr_dev(nav, "class", "p-0 m-0 navbar navbar-dark navbar-expand-sm svelte-1teqv7");
    			add_location(nav, file$b, 41, 2, 900);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div1);
    			append_dev(div1, a0);
    			append_dev(a0, i);
    			append_dev(a0, t0);
    			append_dev(a0, span0);
    			append_dev(div1, t2);
    			append_dev(div1, button);
    			append_dev(button, span1);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, ul);
    			if (if_block0) if_block0.m(ul, null);
    			append_dev(ul, t4);
    			append_dev(ul, li0);
    			mount_component(link0, li0, null);
    			append_dev(ul, t5);
    			append_dev(ul, li1);
    			mount_component(link1, li1, null);
    			append_dev(ul, t6);
    			if (if_block1) if_block1.m(ul, null);
    			append_dev(ul, t7);
    			if (if_block2) if_block2.m(ul, null);
    			append_dev(ul, t8);
    			append_dev(ul, li2);
    			mount_component(link2, li2, null);
    			append_dev(ul, t9);
    			append_dev(ul, li3);
    			mount_component(link3, li3, null);
    			append_dev(ul, t10);
    			append_dev(ul, li4);
    			append_dev(li4, a1);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a0, "click", /*updateCurrentPath*/ ctx[2], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*loggedIn*/ ctx[0]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*loggedIn*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(ul, t4);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const link0_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);

    			if (!current || dirty & /*currentPath*/ 2) {
    				toggle_class(li0, "active", /*currentPath*/ ctx[1] === "/");
    			}

    			const link1_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);

    			if (!current || dirty & /*currentPath*/ 2) {
    				toggle_class(li1, "active", /*currentPath*/ ctx[1] === "/faq");
    			}

    			if (!/*loggedIn*/ ctx[0]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*loggedIn*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_1$2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(ul, t7);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!/*loggedIn*/ ctx[0]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty & /*loggedIn*/ 1) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block$3(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(ul, t8);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			const link2_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				link2_changes.$$scope = { dirty, ctx };
    			}

    			link2.$set(link2_changes);

    			if (!current || dirty & /*currentPath*/ 2) {
    				toggle_class(li2, "active", /*currentPath*/ ctx[1] === "/contact");
    			}

    			const link3_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				link3_changes.$$scope = { dirty, ctx };
    			}

    			link3.$set(link3_changes);

    			if (!current || dirty & /*currentPath*/ 2) {
    				toggle_class(li3, "active", /*currentPath*/ ctx[1] === "/chatgpt");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(link2.$$.fragment, local);
    			transition_in(link3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(link2.$$.fragment, local);
    			transition_out(link3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			if (if_block0) if_block0.d();
    			destroy_component(link0);
    			destroy_component(link1);
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			destroy_component(link2);
    			destroy_component(link3);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(41:0) <Router>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};

    			if (dirty & /*$$scope, currentPath, loggedIn*/ 19) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navbar', slots, []);
    	let loggedIn = false;
    	window.addEventListener("load", updateCurrentPath);
    	window.addEventListener("DOMContentLoaded", updateCurrentPath);
    	window.addEventListener("popstate", updateCurrentPath);

    	function updateLocalstorage() {
    		let aux = localStorage.getItem('token');

    		if (aux === null || aux.trim() === "") {
    			$$invalidate(0, loggedIn = false);
    		} else {
    			$$invalidate(0, loggedIn = true);
    		}
    	}

    	let currentPath = "";

    	async function updateCurrentPath() {
    		$$invalidate(1, currentPath = window.location.pathname);
    	}

    	onMount(() => {
    		setInterval(
    			() => {
    				updateCurrentPath();
    			},
    			100
    		);

    		const token = localStorage.getItem("token");

    		if (token === null || token.trim() === "") {
    			navigate("/");
    		} else {
    			$$invalidate(0, loggedIn = true);
    		}
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navbar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		loggedIn,
    		Router,
    		Link,
    		navigate,
    		onMount,
    		updateLocalstorage,
    		currentPath,
    		updateCurrentPath
    	});

    	$$self.$inject_state = $$props => {
    		if ('loggedIn' in $$props) $$invalidate(0, loggedIn = $$props.loggedIn);
    		if ('currentPath' in $$props) $$invalidate(1, currentPath = $$props.currentPath);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [loggedIn, currentPath, updateCurrentPath];
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/components/Footer.svelte generated by Svelte v3.58.0 */

    const file$a = "src/components/Footer.svelte";

    function create_fragment$c(ctx) {
    	let footer;
    	let div24;
    	let div10;
    	let div9;
    	let div2;
    	let div1;
    	let i0;
    	let t0;
    	let div0;
    	let h40;
    	let t2;
    	let span0;
    	let t4;
    	let div5;
    	let div4;
    	let i1;
    	let t5;
    	let div3;
    	let h41;
    	let t7;
    	let span1;
    	let t9;
    	let div8;
    	let div7;
    	let i2;
    	let t10;
    	let div6;
    	let h42;
    	let t12;
    	let span2;
    	let t14;
    	let div23;
    	let div22;
    	let div15;
    	let div14;
    	let div11;
    	let a0;
    	let img;
    	let img_src_value;
    	let t15;
    	let div12;
    	let p0;
    	let t17;
    	let div13;
    	let a1;
    	let i3;
    	let t18;
    	let a2;
    	let i4;
    	let t19;
    	let a3;
    	let i5;
    	let t20;
    	let a4;
    	let i6;
    	let t21;
    	let div16;
    	let t22;
    	let div21;
    	let div20;
    	let div17;
    	let h3;
    	let t24;
    	let div18;
    	let p1;
    	let t26;
    	let div19;
    	let form;
    	let input;
    	let t27;
    	let button;
    	let i7;
    	let t28;
    	let div29;
    	let div28;
    	let div27;
    	let div26;
    	let div25;
    	let p2;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div24 = element("div");
    			div10 = element("div");
    			div9 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			i0 = element("i");
    			t0 = space();
    			div0 = element("div");
    			h40 = element("h4");
    			h40.textContent = "Retrouvez-nous";
    			t2 = space();
    			span0 = element("span");
    			span0.textContent = "25 Quai du Président Paul Doumer 92400 Courbevoie";
    			t4 = space();
    			div5 = element("div");
    			div4 = element("div");
    			i1 = element("i");
    			t5 = space();
    			div3 = element("div");
    			h41 = element("h4");
    			h41.textContent = "Contactez-nous par téléphone";
    			t7 = space();
    			span1 = element("span");
    			span1.textContent = "+33 (0)1 34 80 72 92";
    			t9 = space();
    			div8 = element("div");
    			div7 = element("div");
    			i2 = element("i");
    			t10 = space();
    			div6 = element("div");
    			h42 = element("h4");
    			h42.textContent = "Contactez-nous par mail";
    			t12 = space();
    			span2 = element("span");
    			span2.textContent = "info@yuccanlead.com";
    			t14 = space();
    			div23 = element("div");
    			div22 = element("div");
    			div15 = element("div");
    			div14 = element("div");
    			div11 = element("div");
    			a0 = element("a");
    			img = element("img");
    			t15 = space();
    			div12 = element("div");
    			p0 = element("p");
    			p0.textContent = "Yuccan Lead est une application mobile de parrainage digital. Lorsqu'ils mettent en relation leurs proches avec des professionnels référencées sur l'appli, des particuliers peuvent gagner des récompenses monétaires qui leur sont reversées sous forme de virements bancaires. Ces mêmes versements peuvent également être transformés en dons dans le cas de parrainage solidaire.";
    			t17 = space();
    			div13 = element("div");
    			a1 = element("a");
    			i3 = element("i");
    			t18 = space();
    			a2 = element("a");
    			i4 = element("i");
    			t19 = space();
    			a3 = element("a");
    			i5 = element("i");
    			t20 = space();
    			a4 = element("a");
    			i6 = element("i");
    			t21 = space();
    			div16 = element("div");
    			t22 = space();
    			div21 = element("div");
    			div20 = element("div");
    			div17 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Inscrivez-vous à notre newsletter";
    			t24 = space();
    			div18 = element("div");
    			p1 = element("p");
    			p1.textContent = "Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles, mises à jour et promotions de notre entreprise directement dans votre boîte de réception. Nous envoyons des e-mails de manière régulière, mais nous ne vous inonderons pas de spam. Vous pouvez vous désabonner à tout moment en cliquant sur le lien de désabonnement en bas de chaque e-mail. Merci de votre intérêt pour notre entreprise !";
    			t26 = space();
    			div19 = element("div");
    			form = element("form");
    			input = element("input");
    			t27 = space();
    			button = element("button");
    			i7 = element("i");
    			t28 = space();
    			div29 = element("div");
    			div28 = element("div");
    			div27 = element("div");
    			div26 = element("div");
    			div25 = element("div");
    			p2 = element("p");
    			p2.textContent = "Copyright © 2023, YuccanLead All Right Reserved";
    			attr_dev(i0, "class", "fas fa-map-marker-alt svelte-1u0bcau");
    			add_location(i0, file$a, 6, 24, 261);
    			attr_dev(h40, "class", "svelte-1u0bcau");
    			add_location(h40, file$a, 8, 28, 383);
    			attr_dev(span0, "class", "svelte-1u0bcau");
    			add_location(span0, file$a, 9, 28, 435);
    			attr_dev(div0, "class", "headersColumnText svelte-1u0bcau");
    			add_location(div0, file$a, 7, 24, 323);
    			attr_dev(div1, "class", "headersColumn svelte-1u0bcau");
    			add_location(div1, file$a, 5, 20, 209);
    			attr_dev(div2, "class", "col-xl-4 col-md-4 mb-30");
    			add_location(div2, file$a, 4, 16, 151);
    			attr_dev(i1, "class", "fas fa-phone svelte-1u0bcau");
    			add_location(i1, file$a, 16, 24, 734);
    			attr_dev(h41, "class", "svelte-1u0bcau");
    			add_location(h41, file$a, 18, 28, 847);
    			attr_dev(span1, "class", "svelte-1u0bcau");
    			add_location(span1, file$a, 19, 28, 913);
    			attr_dev(div3, "class", "headersColumnText svelte-1u0bcau");
    			add_location(div3, file$a, 17, 24, 787);
    			attr_dev(div4, "class", "headersColumn svelte-1u0bcau");
    			add_location(div4, file$a, 15, 20, 682);
    			attr_dev(div5, "class", "col-xl-4 col-md-4 mb-30");
    			add_location(div5, file$a, 14, 16, 624);
    			attr_dev(i2, "class", "far fa-envelope-open svelte-1u0bcau");
    			add_location(i2, file$a, 26, 24, 1184);
    			attr_dev(h42, "class", "svelte-1u0bcau");
    			add_location(h42, file$a, 28, 28, 1305);
    			attr_dev(span2, "class", "svelte-1u0bcau");
    			add_location(span2, file$a, 29, 28, 1366);
    			attr_dev(div6, "class", "headersColumnText svelte-1u0bcau");
    			add_location(div6, file$a, 27, 24, 1245);
    			attr_dev(div7, "class", "headersColumn svelte-1u0bcau");
    			add_location(div7, file$a, 25, 20, 1132);
    			attr_dev(div8, "class", "col-xl-4 col-md-4 mb-30");
    			add_location(div8, file$a, 24, 16, 1074);
    			attr_dev(div9, "class", "row");
    			add_location(div9, file$a, 3, 12, 117);
    			attr_dev(div10, "class", "footerHeader pt-5 pb-5 svelte-1u0bcau");
    			add_location(div10, file$a, 2, 8, 68);
    			if (!src_url_equal(img.src, img_src_value = "assets/images/footerLogo.webp")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "img-fluid svelte-1u0bcau");
    			attr_dev(img, "alt", "logo");
    			add_location(img, file$a, 41, 49, 1821);
    			attr_dev(a0, "href", "index.html");
    			attr_dev(a0, "class", "svelte-1u0bcau");
    			add_location(a0, file$a, 41, 28, 1800);
    			attr_dev(div11, "class", "footerLogo svelte-1u0bcau");
    			add_location(div11, file$a, 40, 24, 1747);
    			attr_dev(p0, "class", "svelte-1u0bcau");
    			add_location(p0, file$a, 44, 28, 2005);
    			attr_dev(div12, "class", "footer-text svelte-1u0bcau");
    			add_location(div12, file$a, 43, 24, 1951);
    			attr_dev(i3, "class", "fab fa-linkedin facebook-bg svelte-1u0bcau");
    			add_location(i3, file$a, 47, 40, 2508);
    			attr_dev(a1, "href", "#");
    			attr_dev(a1, "class", "svelte-1u0bcau");
    			add_location(a1, file$a, 47, 28, 2496);
    			attr_dev(i4, "class", "fab fa-facebook-f facebook-bg svelte-1u0bcau");
    			add_location(i4, file$a, 49, 40, 2597);
    			attr_dev(a2, "href", "#");
    			attr_dev(a2, "class", "svelte-1u0bcau");
    			add_location(a2, file$a, 49, 28, 2585);
    			attr_dev(i5, "class", "fab fa-twitter twitter-bg svelte-1u0bcau");
    			add_location(i5, file$a, 50, 40, 2687);
    			attr_dev(a3, "href", "#");
    			attr_dev(a3, "class", "svelte-1u0bcau");
    			add_location(a3, file$a, 50, 28, 2675);
    			attr_dev(i6, "class", "fab fa-youtube youtube-bg svelte-1u0bcau");
    			add_location(i6, file$a, 51, 40, 2773);
    			attr_dev(a4, "href", "#");
    			attr_dev(a4, "class", "svelte-1u0bcau");
    			add_location(a4, file$a, 51, 28, 2761);
    			attr_dev(div13, "class", "footerIcons svelte-1u0bcau");
    			add_location(div13, file$a, 46, 24, 2442);
    			attr_dev(div14, "class", "footerContent svelte-1u0bcau");
    			add_location(div14, file$a, 39, 20, 1695);
    			attr_dev(div15, "class", "col-xl-4 col-lg-4 mb-50");
    			add_location(div15, file$a, 38, 16, 1637);
    			attr_dev(div16, "class", "col-xl-4 col-lg-4 col-md-6 mb-30");
    			add_location(div16, file$a, 55, 16, 2916);
    			attr_dev(h3, "class", "svelte-1u0bcau");
    			add_location(h3, file$a, 61, 28, 3202);
    			attr_dev(div17, "class", "footerContent-heading svelte-1u0bcau");
    			add_location(div17, file$a, 60, 24, 3138);
    			attr_dev(p1, "class", "svelte-1u0bcau");
    			add_location(p1, file$a, 64, 28, 3360);
    			attr_dev(div18, "class", "footer-text mb-25 svelte-1u0bcau");
    			add_location(div18, file$a, 63, 24, 3300);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", "Email Address");
    			attr_dev(input, "class", "svelte-1u0bcau");
    			add_location(input, file$a, 68, 32, 3924);
    			attr_dev(i7, "class", "fab fa-telegram-plane svelte-1u0bcau");
    			add_location(i7, file$a, 69, 40, 4012);
    			attr_dev(button, "class", "svelte-1u0bcau");
    			add_location(button, file$a, 69, 32, 4004);
    			add_location(form, file$a, 67, 28, 3885);
    			attr_dev(div19, "class", "subscribe-form svelte-1u0bcau");
    			add_location(div19, file$a, 66, 24, 3828);
    			attr_dev(div20, "class", "footerContent");
    			add_location(div20, file$a, 59, 20, 3086);
    			attr_dev(div21, "class", "col-xl-4 col-lg-4 col-md-6 mb-50");
    			add_location(div21, file$a, 58, 16, 3019);
    			attr_dev(div22, "class", "row");
    			add_location(div22, file$a, 37, 12, 1603);
    			attr_dev(div23, "class", "footer-content pt-5 pb-5 svelte-1u0bcau");
    			add_location(div23, file$a, 36, 8, 1552);
    			attr_dev(div24, "class", "container");
    			add_location(div24, file$a, 1, 4, 36);
    			attr_dev(p2, "class", "svelte-1u0bcau");
    			add_location(p2, file$a, 82, 24, 4448);
    			attr_dev(div25, "class", "copyrightText svelte-1u0bcau");
    			add_location(div25, file$a, 81, 20, 4396);
    			attr_dev(div26, "class", "text-center text-lg-left");
    			add_location(div26, file$a, 80, 16, 4336);
    			attr_dev(div27, "class", "row");
    			add_location(div27, file$a, 79, 12, 4302);
    			attr_dev(div28, "class", "container");
    			add_location(div28, file$a, 78, 8, 4266);
    			attr_dev(div29, "class", "copyrightContainer svelte-1u0bcau");
    			add_location(div29, file$a, 77, 4, 4225);
    			attr_dev(footer, "class", "footer-section svelte-1u0bcau");
    			add_location(footer, file$a, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div24);
    			append_dev(div24, div10);
    			append_dev(div10, div9);
    			append_dev(div9, div2);
    			append_dev(div2, div1);
    			append_dev(div1, i0);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, h40);
    			append_dev(div0, t2);
    			append_dev(div0, span0);
    			append_dev(div9, t4);
    			append_dev(div9, div5);
    			append_dev(div5, div4);
    			append_dev(div4, i1);
    			append_dev(div4, t5);
    			append_dev(div4, div3);
    			append_dev(div3, h41);
    			append_dev(div3, t7);
    			append_dev(div3, span1);
    			append_dev(div9, t9);
    			append_dev(div9, div8);
    			append_dev(div8, div7);
    			append_dev(div7, i2);
    			append_dev(div7, t10);
    			append_dev(div7, div6);
    			append_dev(div6, h42);
    			append_dev(div6, t12);
    			append_dev(div6, span2);
    			append_dev(div24, t14);
    			append_dev(div24, div23);
    			append_dev(div23, div22);
    			append_dev(div22, div15);
    			append_dev(div15, div14);
    			append_dev(div14, div11);
    			append_dev(div11, a0);
    			append_dev(a0, img);
    			append_dev(div14, t15);
    			append_dev(div14, div12);
    			append_dev(div12, p0);
    			append_dev(div14, t17);
    			append_dev(div14, div13);
    			append_dev(div13, a1);
    			append_dev(a1, i3);
    			append_dev(div13, t18);
    			append_dev(div13, a2);
    			append_dev(a2, i4);
    			append_dev(div13, t19);
    			append_dev(div13, a3);
    			append_dev(a3, i5);
    			append_dev(div13, t20);
    			append_dev(div13, a4);
    			append_dev(a4, i6);
    			append_dev(div22, t21);
    			append_dev(div22, div16);
    			append_dev(div22, t22);
    			append_dev(div22, div21);
    			append_dev(div21, div20);
    			append_dev(div20, div17);
    			append_dev(div17, h3);
    			append_dev(div20, t24);
    			append_dev(div20, div18);
    			append_dev(div18, p1);
    			append_dev(div20, t26);
    			append_dev(div20, div19);
    			append_dev(div19, form);
    			append_dev(form, input);
    			append_dev(form, t27);
    			append_dev(form, button);
    			append_dev(button, i7);
    			append_dev(footer, t28);
    			append_dev(footer, div29);
    			append_dev(div29, div28);
    			append_dev(div28, div27);
    			append_dev(div27, div26);
    			append_dev(div26, div25);
    			append_dev(div25, p2);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/layout/layout.svelte generated by Svelte v3.58.0 */
    const file$9 = "src/layout/layout.svelte";

    function create_fragment$b(ctx) {
    	let div;
    	let navbar;
    	let t0;
    	let main;
    	let t1;
    	let footer;
    	let current;
    	navbar = new Navbar({ $$inline: true });
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(navbar.$$.fragment);
    			t0 = space();
    			main = element("main");
    			if (default_slot) default_slot.c();
    			t1 = space();
    			create_component(footer.$$.fragment);
    			add_location(main, file$9, 8, 4, 169);
    			attr_dev(div, "class", "m-0 p-0");
    			add_location(div, file$9, 4, 0, 124);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(navbar, div, null);
    			append_dev(div, t0);
    			append_dev(div, main);

    			if (default_slot) {
    				default_slot.m(main, null);
    			}

    			append_dev(div, t1);
    			mount_component(footer, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			transition_in(default_slot, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(default_slot, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(navbar);
    			if (default_slot) default_slot.d(detaching);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Layout', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Layout> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Navbar, Footer });
    	return [$$scope, slots];
    }

    class Layout extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Layout",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/routes/LandingScreen.svelte generated by Svelte v3.58.0 */
    const file$8 = "src/routes/LandingScreen.svelte";

    function create_fragment$a(ctx) {
    	let main;
    	let div2;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let h1;
    	let span;
    	let t2;
    	let t3;
    	let h2;
    	let t5;
    	let button;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div2 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			h1 = element("h1");
    			span = element("span");
    			span.textContent = "YuccanLead";
    			t2 = text(" - Foire aux questions");
    			t3 = space();
    			h2 = element("h2");
    			h2.textContent = "Réponses à vos questions sur notre application de recommandations\n        bouche-à-oreille.";
    			t5 = space();
    			button = element("button");
    			button.textContent = "Consulter";
    			attr_dev(img, "class", "header-image mb-5 svelte-1jn8syk");
    			if (!src_url_equal(img.src, img_src_value = "assets/images/wall.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "wallpaper");
    			add_location(img, file$8, 7, 6, 149);
    			attr_dev(div0, "class", "wallpaper svelte-1jn8syk");
    			add_location(div0, file$8, 6, 4, 119);
    			attr_dev(span, "class", "svelte-1jn8syk");
    			add_location(span, file$8, 15, 10, 321);
    			attr_dev(h1, "class", "svelte-1jn8syk");
    			add_location(h1, file$8, 15, 6, 317);
    			attr_dev(h2, "class", "svelte-1jn8syk");
    			add_location(h2, file$8, 16, 6, 379);
    			attr_dev(button, "class", "float-right svelte-1jn8syk");
    			add_location(button, file$8, 20, 6, 502);
    			attr_dev(div1, "id", "content-text");
    			attr_dev(div1, "class", "mt-1 svelte-1jn8syk");
    			add_location(div1, file$8, 14, 4, 274);
    			attr_dev(div2, "id", "content");
    			attr_dev(div2, "class", "mt-0 p-5 pt-5 svelte-1jn8syk");
    			add_location(div2, file$8, 5, 2, 74);
    			attr_dev(main, "class", "svelte-1jn8syk");
    			add_location(main, file$8, 4, 0, 65);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div2);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(h1, span);
    			append_dev(h1, t2);
    			append_dev(div1, t3);
    			append_dev(div1, h2);
    			append_dev(div1, t5);
    			append_dev(div1, button);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LandingScreen', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LandingScreen> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ navigate });
    	return [];
    }

    class LandingScreen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LandingScreen",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    function bind(fn, thisArg) {
      return function wrap() {
        return fn.apply(thisArg, arguments);
      };
    }

    // utils is a library of generic helper functions non-specific to axios

    const {toString} = Object.prototype;
    const {getPrototypeOf} = Object;

    const kindOf = (cache => thing => {
        const str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    })(Object.create(null));

    const kindOfTest = (type) => {
      type = type.toLowerCase();
      return (thing) => kindOf(thing) === type
    };

    const typeOfTest = type => thing => typeof thing === type;

    /**
     * Determine if a value is an Array
     *
     * @param {Object} val The value to test
     *
     * @returns {boolean} True if value is an Array, otherwise false
     */
    const {isArray} = Array;

    /**
     * Determine if a value is undefined
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if the value is undefined, otherwise false
     */
    const isUndefined = typeOfTest('undefined');

    /**
     * Determine if a value is a Buffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Buffer, otherwise false
     */
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
        && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
    }

    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */
    const isArrayBuffer = kindOfTest('ArrayBuffer');


    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */
    function isArrayBufferView(val) {
      let result;
      if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val);
      } else {
        result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
      }
      return result;
    }

    /**
     * Determine if a value is a String
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a String, otherwise false
     */
    const isString = typeOfTest('string');

    /**
     * Determine if a value is a Function
     *
     * @param {*} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */
    const isFunction = typeOfTest('function');

    /**
     * Determine if a value is a Number
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Number, otherwise false
     */
    const isNumber = typeOfTest('number');

    /**
     * Determine if a value is an Object
     *
     * @param {*} thing The value to test
     *
     * @returns {boolean} True if value is an Object, otherwise false
     */
    const isObject = (thing) => thing !== null && typeof thing === 'object';

    /**
     * Determine if a value is a Boolean
     *
     * @param {*} thing The value to test
     * @returns {boolean} True if value is a Boolean, otherwise false
     */
    const isBoolean = thing => thing === true || thing === false;

    /**
     * Determine if a value is a plain Object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a plain Object, otherwise false
     */
    const isPlainObject = (val) => {
      if (kindOf(val) !== 'object') {
        return false;
      }

      const prototype = getPrototypeOf(val);
      return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
    };

    /**
     * Determine if a value is a Date
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Date, otherwise false
     */
    const isDate$1 = kindOfTest('Date');

    /**
     * Determine if a value is a File
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a File, otherwise false
     */
    const isFile = kindOfTest('File');

    /**
     * Determine if a value is a Blob
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Blob, otherwise false
     */
    const isBlob = kindOfTest('Blob');

    /**
     * Determine if a value is a FileList
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a File, otherwise false
     */
    const isFileList = kindOfTest('FileList');

    /**
     * Determine if a value is a Stream
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Stream, otherwise false
     */
    const isStream = (val) => isObject(val) && isFunction(val.pipe);

    /**
     * Determine if a value is a FormData
     *
     * @param {*} thing The value to test
     *
     * @returns {boolean} True if value is an FormData, otherwise false
     */
    const isFormData = (thing) => {
      let kind;
      return thing && (
        (typeof FormData === 'function' && thing instanceof FormData) || (
          isFunction(thing.append) && (
            (kind = kindOf(thing)) === 'formdata' ||
            // detect form-data instance
            (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
          )
        )
      )
    };

    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */
    const isURLSearchParams = kindOfTest('URLSearchParams');

    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     *
     * @returns {String} The String freed of excess whitespace
     */
    const trim = (str) => str.trim ?
      str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

    /**
     * Iterate over an Array or an Object invoking a function for each item.
     *
     * If `obj` is an Array callback will be called passing
     * the value, index, and complete array for each item.
     *
     * If 'obj' is an Object callback will be called passing
     * the value, key, and complete object for each property.
     *
     * @param {Object|Array} obj The object to iterate
     * @param {Function} fn The callback to invoke for each item
     *
     * @param {Boolean} [allOwnKeys = false]
     * @returns {any}
     */
    function forEach(obj, fn, {allOwnKeys = false} = {}) {
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
        return;
      }

      let i;
      let l;

      // Force an array if not already something iterable
      if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }

      if (isArray(obj)) {
        // Iterate over array values
        for (i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Iterate over object keys
        const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        const len = keys.length;
        let key;

        for (i = 0; i < len; i++) {
          key = keys[i];
          fn.call(null, obj[key], key, obj);
        }
      }
    }

    function findKey$1(obj, key) {
      key = key.toLowerCase();
      const keys = Object.keys(obj);
      let i = keys.length;
      let _key;
      while (i-- > 0) {
        _key = keys[i];
        if (key === _key.toLowerCase()) {
          return _key;
        }
      }
      return null;
    }

    const _global = (() => {
      /*eslint no-undef:0*/
      if (typeof globalThis !== "undefined") return globalThis;
      return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
    })();

    const isContextDefined = (context) => !isUndefined(context) && context !== _global;

    /**
     * Accepts varargs expecting each argument to be an object, then
     * immutably merges the properties of each object and returns result.
     *
     * When multiple objects contain the same key the later object in
     * the arguments list will take precedence.
     *
     * Example:
     *
     * ```js
     * var result = merge({foo: 123}, {foo: 456});
     * console.log(result.foo); // outputs 456
     * ```
     *
     * @param {Object} obj1 Object to merge
     *
     * @returns {Object} Result of all merge properties
     */
    function merge(/* obj1, obj2, obj3, ... */) {
      const {caseless} = isContextDefined(this) && this || {};
      const result = {};
      const assignValue = (val, key) => {
        const targetKey = caseless && findKey$1(result, key) || key;
        if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
          result[targetKey] = merge(result[targetKey], val);
        } else if (isPlainObject(val)) {
          result[targetKey] = merge({}, val);
        } else if (isArray(val)) {
          result[targetKey] = val.slice();
        } else {
          result[targetKey] = val;
        }
      };

      for (let i = 0, l = arguments.length; i < l; i++) {
        arguments[i] && forEach(arguments[i], assignValue);
      }
      return result;
    }

    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     *
     * @param {Boolean} [allOwnKeys]
     * @returns {Object} The resulting value of object a
     */
    const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
      forEach(b, (val, key) => {
        if (thisArg && isFunction(val)) {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      }, {allOwnKeys});
      return a;
    };

    /**
     * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
     *
     * @param {string} content with BOM
     *
     * @returns {string} content value without BOM
     */
    const stripBOM = (content) => {
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }
      return content;
    };

    /**
     * Inherit the prototype methods from one constructor into another
     * @param {function} constructor
     * @param {function} superConstructor
     * @param {object} [props]
     * @param {object} [descriptors]
     *
     * @returns {void}
     */
    const inherits = (constructor, superConstructor, props, descriptors) => {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      Object.defineProperty(constructor, 'super', {
        value: superConstructor.prototype
      });
      props && Object.assign(constructor.prototype, props);
    };

    /**
     * Resolve object with deep prototype chain to a flat object
     * @param {Object} sourceObj source object
     * @param {Object} [destObj]
     * @param {Function|Boolean} [filter]
     * @param {Function} [propFilter]
     *
     * @returns {Object}
     */
    const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
      let props;
      let i;
      let prop;
      const merged = {};

      destObj = destObj || {};
      // eslint-disable-next-line no-eq-null,eqeqeq
      if (sourceObj == null) return destObj;

      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
          prop = props[i];
          if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = filter !== false && getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

      return destObj;
    };

    /**
     * Determines whether a string ends with the characters of a specified string
     *
     * @param {String} str
     * @param {String} searchString
     * @param {Number} [position= 0]
     *
     * @returns {boolean}
     */
    const endsWith = (str, searchString, position) => {
      str = String(str);
      if (position === undefined || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      const lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };


    /**
     * Returns new array from array like object or null if failed
     *
     * @param {*} [thing]
     *
     * @returns {?Array}
     */
    const toArray = (thing) => {
      if (!thing) return null;
      if (isArray(thing)) return thing;
      let i = thing.length;
      if (!isNumber(i)) return null;
      const arr = new Array(i);
      while (i-- > 0) {
        arr[i] = thing[i];
      }
      return arr;
    };

    /**
     * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
     * thing passed in is an instance of Uint8Array
     *
     * @param {TypedArray}
     *
     * @returns {Array}
     */
    // eslint-disable-next-line func-names
    const isTypedArray = (TypedArray => {
      // eslint-disable-next-line func-names
      return thing => {
        return TypedArray && thing instanceof TypedArray;
      };
    })(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

    /**
     * For each entry in the object, call the function with the key and value.
     *
     * @param {Object<any, any>} obj - The object to iterate over.
     * @param {Function} fn - The function to call for each entry.
     *
     * @returns {void}
     */
    const forEachEntry = (obj, fn) => {
      const generator = obj && obj[Symbol.iterator];

      const iterator = generator.call(obj);

      let result;

      while ((result = iterator.next()) && !result.done) {
        const pair = result.value;
        fn.call(obj, pair[0], pair[1]);
      }
    };

    /**
     * It takes a regular expression and a string, and returns an array of all the matches
     *
     * @param {string} regExp - The regular expression to match against.
     * @param {string} str - The string to search.
     *
     * @returns {Array<boolean>}
     */
    const matchAll = (regExp, str) => {
      let matches;
      const arr = [];

      while ((matches = regExp.exec(str)) !== null) {
        arr.push(matches);
      }

      return arr;
    };

    /* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
    const isHTMLForm = kindOfTest('HTMLFormElement');

    const toCamelCase = str => {
      return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
        function replacer(m, p1, p2) {
          return p1.toUpperCase() + p2;
        }
      );
    };

    /* Creating a function that will check if an object has a property. */
    const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

    /**
     * Determine if a value is a RegExp object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a RegExp object, otherwise false
     */
    const isRegExp = kindOfTest('RegExp');

    const reduceDescriptors = (obj, reducer) => {
      const descriptors = Object.getOwnPropertyDescriptors(obj);
      const reducedDescriptors = {};

      forEach(descriptors, (descriptor, name) => {
        if (reducer(descriptor, name, obj) !== false) {
          reducedDescriptors[name] = descriptor;
        }
      });

      Object.defineProperties(obj, reducedDescriptors);
    };

    /**
     * Makes all methods read-only
     * @param {Object} obj
     */

    const freezeMethods = (obj) => {
      reduceDescriptors(obj, (descriptor, name) => {
        // skip restricted props in strict mode
        if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
          return false;
        }

        const value = obj[name];

        if (!isFunction(value)) return;

        descriptor.enumerable = false;

        if ('writable' in descriptor) {
          descriptor.writable = false;
          return;
        }

        if (!descriptor.set) {
          descriptor.set = () => {
            throw Error('Can not rewrite read-only method \'' + name + '\'');
          };
        }
      });
    };

    const toObjectSet = (arrayOrString, delimiter) => {
      const obj = {};

      const define = (arr) => {
        arr.forEach(value => {
          obj[value] = true;
        });
      };

      isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

      return obj;
    };

    const noop = () => {};

    const toFiniteNumber = (value, defaultValue) => {
      value = +value;
      return Number.isFinite(value) ? value : defaultValue;
    };

    const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

    const DIGIT = '0123456789';

    const ALPHABET = {
      DIGIT,
      ALPHA,
      ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
    };

    const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
      let str = '';
      const {length} = alphabet;
      while (size--) {
        str += alphabet[Math.random() * length|0];
      }

      return str;
    };

    /**
     * If the thing is a FormData object, return true, otherwise return false.
     *
     * @param {unknown} thing - The thing to check.
     *
     * @returns {boolean}
     */
    function isSpecCompliantForm(thing) {
      return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
    }

    const toJSONObject = (obj) => {
      const stack = new Array(10);

      const visit = (source, i) => {

        if (isObject(source)) {
          if (stack.indexOf(source) >= 0) {
            return;
          }

          if(!('toJSON' in source)) {
            stack[i] = source;
            const target = isArray(source) ? [] : {};

            forEach(source, (value, key) => {
              const reducedValue = visit(value, i + 1);
              !isUndefined(reducedValue) && (target[key] = reducedValue);
            });

            stack[i] = undefined;

            return target;
          }
        }

        return source;
      };

      return visit(obj, 0);
    };

    const isAsyncFn = kindOfTest('AsyncFunction');

    const isThenable = (thing) =>
      thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

    var utils = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isBoolean,
      isObject,
      isPlainObject,
      isUndefined,
      isDate: isDate$1,
      isFile,
      isBlob,
      isRegExp,
      isFunction,
      isStream,
      isURLSearchParams,
      isTypedArray,
      isFileList,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      forEachEntry,
      matchAll,
      isHTMLForm,
      hasOwnProperty,
      hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
      reduceDescriptors,
      freezeMethods,
      toObjectSet,
      toCamelCase,
      noop,
      toFiniteNumber,
      findKey: findKey$1,
      global: _global,
      isContextDefined,
      ALPHABET,
      generateString,
      isSpecCompliantForm,
      toJSONObject,
      isAsyncFn,
      isThenable
    };

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [config] The config.
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     *
     * @returns {Error} The created error.
     */
    function AxiosError(message, code, config, request, response) {
      Error.call(this);

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = (new Error()).stack;
      }

      this.message = message;
      this.name = 'AxiosError';
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }

    utils.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: utils.toJSONObject(this.config),
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });

    const prototype$1 = AxiosError.prototype;
    const descriptors = {};

    [
      'ERR_BAD_OPTION_VALUE',
      'ERR_BAD_OPTION',
      'ECONNABORTED',
      'ETIMEDOUT',
      'ERR_NETWORK',
      'ERR_FR_TOO_MANY_REDIRECTS',
      'ERR_DEPRECATED',
      'ERR_BAD_RESPONSE',
      'ERR_BAD_REQUEST',
      'ERR_CANCELED',
      'ERR_NOT_SUPPORT',
      'ERR_INVALID_URL'
    // eslint-disable-next-line func-names
    ].forEach(code => {
      descriptors[code] = {value: code};
    });

    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

    // eslint-disable-next-line func-names
    AxiosError.from = (error, code, config, request, response, customProps) => {
      const axiosError = Object.create(prototype$1);

      utils.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      }, prop => {
        return prop !== 'isAxiosError';
      });

      AxiosError.call(axiosError, error.message, code, config, request, response);

      axiosError.cause = error;

      axiosError.name = error.name;

      customProps && Object.assign(axiosError, customProps);

      return axiosError;
    };

    // eslint-disable-next-line strict
    var httpAdapter = null;

    /**
     * Determines if the given thing is a array or js object.
     *
     * @param {string} thing - The object or array to be visited.
     *
     * @returns {boolean}
     */
    function isVisitable(thing) {
      return utils.isPlainObject(thing) || utils.isArray(thing);
    }

    /**
     * It removes the brackets from the end of a string
     *
     * @param {string} key - The key of the parameter.
     *
     * @returns {string} the key without the brackets.
     */
    function removeBrackets(key) {
      return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
    }

    /**
     * It takes a path, a key, and a boolean, and returns a string
     *
     * @param {string} path - The path to the current key.
     * @param {string} key - The key of the current object being iterated over.
     * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
     *
     * @returns {string} The path to the current key.
     */
    function renderKey(path, key, dots) {
      if (!path) return key;
      return path.concat(key).map(function each(token, i) {
        // eslint-disable-next-line no-param-reassign
        token = removeBrackets(token);
        return !dots && i ? '[' + token + ']' : token;
      }).join(dots ? '.' : '');
    }

    /**
     * If the array is an array and none of its elements are visitable, then it's a flat array.
     *
     * @param {Array<any>} arr - The array to check
     *
     * @returns {boolean}
     */
    function isFlatArray(arr) {
      return utils.isArray(arr) && !arr.some(isVisitable);
    }

    const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
      return /^is[A-Z]/.test(prop);
    });

    /**
     * Convert a data object to FormData
     *
     * @param {Object} obj
     * @param {?Object} [formData]
     * @param {?Object} [options]
     * @param {Function} [options.visitor]
     * @param {Boolean} [options.metaTokens = true]
     * @param {Boolean} [options.dots = false]
     * @param {?Boolean} [options.indexes = false]
     *
     * @returns {Object}
     **/

    /**
     * It converts an object into a FormData object
     *
     * @param {Object<any, any>} obj - The object to convert to form data.
     * @param {string} formData - The FormData object to append to.
     * @param {Object<string, any>} options
     *
     * @returns
     */
    function toFormData(obj, formData, options) {
      if (!utils.isObject(obj)) {
        throw new TypeError('target must be an object');
      }

      // eslint-disable-next-line no-param-reassign
      formData = formData || new (FormData)();

      // eslint-disable-next-line no-param-reassign
      options = utils.toFlatObject(options, {
        metaTokens: true,
        dots: false,
        indexes: false
      }, false, function defined(option, source) {
        // eslint-disable-next-line no-eq-null,eqeqeq
        return !utils.isUndefined(source[option]);
      });

      const metaTokens = options.metaTokens;
      // eslint-disable-next-line no-use-before-define
      const visitor = options.visitor || defaultVisitor;
      const dots = options.dots;
      const indexes = options.indexes;
      const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
      const useBlob = _Blob && utils.isSpecCompliantForm(formData);

      if (!utils.isFunction(visitor)) {
        throw new TypeError('visitor must be a function');
      }

      function convertValue(value) {
        if (value === null) return '';

        if (utils.isDate(value)) {
          return value.toISOString();
        }

        if (!useBlob && utils.isBlob(value)) {
          throw new AxiosError('Blob is not supported. Use a Buffer instead.');
        }

        if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
          return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
        }

        return value;
      }

      /**
       * Default visitor.
       *
       * @param {*} value
       * @param {String|Number} key
       * @param {Array<String|Number>} path
       * @this {FormData}
       *
       * @returns {boolean} return true to visit the each prop of the value recursively
       */
      function defaultVisitor(value, key, path) {
        let arr = value;

        if (value && !path && typeof value === 'object') {
          if (utils.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            key = metaTokens ? key : key.slice(0, -2);
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (
            (utils.isArray(value) && isFlatArray(value)) ||
            ((utils.isFileList(value) || utils.endsWith(key, '[]')) && (arr = utils.toArray(value))
            )) {
            // eslint-disable-next-line no-param-reassign
            key = removeBrackets(key);

            arr.forEach(function each(el, index) {
              !(utils.isUndefined(el) || el === null) && formData.append(
                // eslint-disable-next-line no-nested-ternary
                indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
                convertValue(el)
              );
            });
            return false;
          }
        }

        if (isVisitable(value)) {
          return true;
        }

        formData.append(renderKey(path, key, dots), convertValue(value));

        return false;
      }

      const stack = [];

      const exposedHelpers = Object.assign(predicates, {
        defaultVisitor,
        convertValue,
        isVisitable
      });

      function build(value, path) {
        if (utils.isUndefined(value)) return;

        if (stack.indexOf(value) !== -1) {
          throw Error('Circular reference detected in ' + path.join('.'));
        }

        stack.push(value);

        utils.forEach(value, function each(el, key) {
          const result = !(utils.isUndefined(el) || el === null) && visitor.call(
            formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers
          );

          if (result === true) {
            build(el, path ? path.concat(key) : [key]);
          }
        });

        stack.pop();
      }

      if (!utils.isObject(obj)) {
        throw new TypeError('data must be an object');
      }

      build(obj);

      return formData;
    }

    /**
     * It encodes a string by replacing all characters that are not in the unreserved set with
     * their percent-encoded equivalents
     *
     * @param {string} str - The string to encode.
     *
     * @returns {string} The encoded string.
     */
    function encode$1(str) {
      const charMap = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\x00'
      };
      return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
        return charMap[match];
      });
    }

    /**
     * It takes a params object and converts it to a FormData object
     *
     * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
     * @param {Object<string, any>} options - The options object passed to the Axios constructor.
     *
     * @returns {void}
     */
    function AxiosURLSearchParams(params, options) {
      this._pairs = [];

      params && toFormData(params, this, options);
    }

    const prototype = AxiosURLSearchParams.prototype;

    prototype.append = function append(name, value) {
      this._pairs.push([name, value]);
    };

    prototype.toString = function toString(encoder) {
      const _encode = encoder ? function(value) {
        return encoder.call(this, value, encode$1);
      } : encode$1;

      return this._pairs.map(function each(pair) {
        return _encode(pair[0]) + '=' + _encode(pair[1]);
      }, '').join('&');
    };

    /**
     * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
     * URI encoded counterparts
     *
     * @param {string} val The value to be encoded.
     *
     * @returns {string} The encoded value.
     */
    function encode(val) {
      return encodeURIComponent(val).
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%20/g, '+').
        replace(/%5B/gi, '[').
        replace(/%5D/gi, ']');
    }

    /**
     * Build a URL by appending params to the end
     *
     * @param {string} url The base of the url (e.g., http://www.google.com)
     * @param {object} [params] The params to be appended
     * @param {?object} options
     *
     * @returns {string} The formatted url
     */
    function buildURL(url, params, options) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }
      
      const _encode = options && options.encode || encode;

      const serializeFn = options && options.serialize;

      let serializedParams;

      if (serializeFn) {
        serializedParams = serializeFn(params, options);
      } else {
        serializedParams = utils.isURLSearchParams(params) ?
          params.toString() :
          new AxiosURLSearchParams(params, options).toString(_encode);
      }

      if (serializedParams) {
        const hashmarkIndex = url.indexOf("#");

        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }

      return url;
    }

    class InterceptorManager {
      constructor() {
        this.handlers = [];
      }

      /**
       * Add a new interceptor to the stack
       *
       * @param {Function} fulfilled The function to handle `then` for a `Promise`
       * @param {Function} rejected The function to handle `reject` for a `Promise`
       *
       * @return {Number} An ID used to remove interceptor later
       */
      use(fulfilled, rejected, options) {
        this.handlers.push({
          fulfilled,
          rejected,
          synchronous: options ? options.synchronous : false,
          runWhen: options ? options.runWhen : null
        });
        return this.handlers.length - 1;
      }

      /**
       * Remove an interceptor from the stack
       *
       * @param {Number} id The ID that was returned by `use`
       *
       * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
       */
      eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      }

      /**
       * Clear all interceptors from the stack
       *
       * @returns {void}
       */
      clear() {
        if (this.handlers) {
          this.handlers = [];
        }
      }

      /**
       * Iterate over all the registered interceptors
       *
       * This method is particularly useful for skipping over any
       * interceptors that may have become `null` calling `eject`.
       *
       * @param {Function} fn The function to call for each interceptor
       *
       * @returns {void}
       */
      forEach(fn) {
        utils.forEach(this.handlers, function forEachHandler(h) {
          if (h !== null) {
            fn(h);
          }
        });
      }
    }

    var InterceptorManager$1 = InterceptorManager;

    var transitionalDefaults = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };

    var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

    var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

    var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

    /**
     * Determine if we're running in a standard browser environment
     *
     * This allows axios to run in a web worker, and react-native.
     * Both environments support XMLHttpRequest, but not fully standard globals.
     *
     * web workers:
     *  typeof window -> undefined
     *  typeof document -> undefined
     *
     * react-native:
     *  navigator.product -> 'ReactNative'
     * nativescript
     *  navigator.product -> 'NativeScript' or 'NS'
     *
     * @returns {boolean}
     */
    const isStandardBrowserEnv = (() => {
      let product;
      if (typeof navigator !== 'undefined' && (
        (product = navigator.product) === 'ReactNative' ||
        product === 'NativeScript' ||
        product === 'NS')
      ) {
        return false;
      }

      return typeof window !== 'undefined' && typeof document !== 'undefined';
    })();

    /**
     * Determine if we're running in a standard browser webWorker environment
     *
     * Although the `isStandardBrowserEnv` method indicates that
     * `allows axios to run in a web worker`, the WebWorker will still be
     * filtered out due to its judgment standard
     * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
     * This leads to a problem when axios post `FormData` in webWorker
     */
     const isStandardBrowserWebWorkerEnv = (() => {
      return (
        typeof WorkerGlobalScope !== 'undefined' &&
        // eslint-disable-next-line no-undef
        self instanceof WorkerGlobalScope &&
        typeof self.importScripts === 'function'
      );
    })();


    var platform = {
      isBrowser: true,
      classes: {
        URLSearchParams: URLSearchParams$1,
        FormData: FormData$1,
        Blob: Blob$1
      },
      isStandardBrowserEnv,
      isStandardBrowserWebWorkerEnv,
      protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
    };

    function toURLEncodedForm(data, options) {
      return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
        visitor: function(value, key, path, helpers) {
          if (platform.isNode && utils.isBuffer(value)) {
            this.append(key, value.toString('base64'));
            return false;
          }

          return helpers.defaultVisitor.apply(this, arguments);
        }
      }, options));
    }

    /**
     * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
     *
     * @param {string} name - The name of the property to get.
     *
     * @returns An array of strings.
     */
    function parsePropPath(name) {
      // foo[x][y][z]
      // foo.x.y.z
      // foo-x-y-z
      // foo x y z
      return utils.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
        return match[0] === '[]' ? '' : match[1] || match[0];
      });
    }

    /**
     * Convert an array to an object.
     *
     * @param {Array<any>} arr - The array to convert to an object.
     *
     * @returns An object with the same keys and values as the array.
     */
    function arrayToObject(arr) {
      const obj = {};
      const keys = Object.keys(arr);
      let i;
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        obj[key] = arr[key];
      }
      return obj;
    }

    /**
     * It takes a FormData object and returns a JavaScript object
     *
     * @param {string} formData The FormData object to convert to JSON.
     *
     * @returns {Object<string, any> | null} The converted object.
     */
    function formDataToJSON(formData) {
      function buildPath(path, value, target, index) {
        let name = path[index++];
        const isNumericKey = Number.isFinite(+name);
        const isLast = index >= path.length;
        name = !name && utils.isArray(target) ? target.length : name;

        if (isLast) {
          if (utils.hasOwnProp(target, name)) {
            target[name] = [target[name], value];
          } else {
            target[name] = value;
          }

          return !isNumericKey;
        }

        if (!target[name] || !utils.isObject(target[name])) {
          target[name] = [];
        }

        const result = buildPath(path, value, target[name], index);

        if (result && utils.isArray(target[name])) {
          target[name] = arrayToObject(target[name]);
        }

        return !isNumericKey;
      }

      if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
        const obj = {};

        utils.forEachEntry(formData, (name, value) => {
          buildPath(parsePropPath(name), value, obj, 0);
        });

        return obj;
      }

      return null;
    }

    const DEFAULT_CONTENT_TYPE = {
      'Content-Type': undefined
    };

    /**
     * It takes a string, tries to parse it, and if it fails, it returns the stringified version
     * of the input
     *
     * @param {any} rawValue - The value to be stringified.
     * @param {Function} parser - A function that parses a string into a JavaScript object.
     * @param {Function} encoder - A function that takes a value and returns a string.
     *
     * @returns {string} A stringified version of the rawValue.
     */
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== 'SyntaxError') {
            throw e;
          }
        }
      }

      return (encoder || JSON.stringify)(rawValue);
    }

    const defaults = {

      transitional: transitionalDefaults,

      adapter: ['xhr', 'http'],

      transformRequest: [function transformRequest(data, headers) {
        const contentType = headers.getContentType() || '';
        const hasJSONContentType = contentType.indexOf('application/json') > -1;
        const isObjectPayload = utils.isObject(data);

        if (isObjectPayload && utils.isHTMLForm(data)) {
          data = new FormData(data);
        }

        const isFormData = utils.isFormData(data);

        if (isFormData) {
          if (!hasJSONContentType) {
            return data;
          }
          return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
        }

        if (utils.isArrayBuffer(data) ||
          utils.isBuffer(data) ||
          utils.isStream(data) ||
          utils.isFile(data) ||
          utils.isBlob(data)
        ) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
          return data.toString();
        }

        let isFileList;

        if (isObjectPayload) {
          if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
            return toURLEncodedForm(data, this.formSerializer).toString();
          }

          if ((isFileList = utils.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
            const _FormData = this.env && this.env.FormData;

            return toFormData(
              isFileList ? {'files[]': data} : data,
              _FormData && new _FormData(),
              this.formSerializer
            );
          }
        }

        if (isObjectPayload || hasJSONContentType ) {
          headers.setContentType('application/json', false);
          return stringifySafely(data);
        }

        return data;
      }],

      transformResponse: [function transformResponse(data) {
        const transitional = this.transitional || defaults.transitional;
        const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        const JSONRequested = this.responseType === 'json';

        if (data && utils.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
          const silentJSONParsing = transitional && transitional.silentJSONParsing;
          const strictJSONParsing = !silentJSONParsing && JSONRequested;

          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === 'SyntaxError') {
                throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e;
            }
          }
        }

        return data;
      }],

      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,

      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',

      maxContentLength: -1,
      maxBodyLength: -1,

      env: {
        FormData: platform.classes.FormData,
        Blob: platform.classes.Blob
      },

      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },

      headers: {
        common: {
          'Accept': 'application/json, text/plain, */*'
        }
      }
    };

    utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });

    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });

    var defaults$1 = defaults;

    // RawAxiosHeaders whose duplicates are ignored by node
    // c.f. https://nodejs.org/api/http.html#http_message_headers
    const ignoreDuplicateOf = utils.toObjectSet([
      'age', 'authorization', 'content-length', 'content-type', 'etag',
      'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
      'last-modified', 'location', 'max-forwards', 'proxy-authorization',
      'referer', 'retry-after', 'user-agent'
    ]);

    /**
     * Parse headers into an object
     *
     * ```
     * Date: Wed, 27 Aug 2014 08:58:49 GMT
     * Content-Type: application/json
     * Connection: keep-alive
     * Transfer-Encoding: chunked
     * ```
     *
     * @param {String} rawHeaders Headers needing to be parsed
     *
     * @returns {Object} Headers parsed into an object
     */
    var parseHeaders = rawHeaders => {
      const parsed = {};
      let key;
      let val;
      let i;

      rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
        i = line.indexOf(':');
        key = line.substring(0, i).trim().toLowerCase();
        val = line.substring(i + 1).trim();

        if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
          return;
        }

        if (key === 'set-cookie') {
          if (parsed[key]) {
            parsed[key].push(val);
          } else {
            parsed[key] = [val];
          }
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      });

      return parsed;
    };

    const $internals = Symbol('internals');

    function normalizeHeader(header) {
      return header && String(header).trim().toLowerCase();
    }

    function normalizeValue(value) {
      if (value === false || value == null) {
        return value;
      }

      return utils.isArray(value) ? value.map(normalizeValue) : String(value);
    }

    function parseTokens(str) {
      const tokens = Object.create(null);
      const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
      let match;

      while ((match = tokensRE.exec(str))) {
        tokens[match[1]] = match[2];
      }

      return tokens;
    }

    const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

    function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
      if (utils.isFunction(filter)) {
        return filter.call(this, value, header);
      }

      if (isHeaderNameFilter) {
        value = header;
      }

      if (!utils.isString(value)) return;

      if (utils.isString(filter)) {
        return value.indexOf(filter) !== -1;
      }

      if (utils.isRegExp(filter)) {
        return filter.test(value);
      }
    }

    function formatHeader(header) {
      return header.trim()
        .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
          return char.toUpperCase() + str;
        });
    }

    function buildAccessors(obj, header) {
      const accessorName = utils.toCamelCase(' ' + header);

      ['get', 'set', 'has'].forEach(methodName => {
        Object.defineProperty(obj, methodName + accessorName, {
          value: function(arg1, arg2, arg3) {
            return this[methodName].call(this, header, arg1, arg2, arg3);
          },
          configurable: true
        });
      });
    }

    class AxiosHeaders {
      constructor(headers) {
        headers && this.set(headers);
      }

      set(header, valueOrRewrite, rewrite) {
        const self = this;

        function setHeader(_value, _header, _rewrite) {
          const lHeader = normalizeHeader(_header);

          if (!lHeader) {
            throw new Error('header name must be a non-empty string');
          }

          const key = utils.findKey(self, lHeader);

          if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
            self[key || _header] = normalizeValue(_value);
          }
        }

        const setHeaders = (headers, _rewrite) =>
          utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

        if (utils.isPlainObject(header) || header instanceof this.constructor) {
          setHeaders(header, valueOrRewrite);
        } else if(utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
          setHeaders(parseHeaders(header), valueOrRewrite);
        } else {
          header != null && setHeader(valueOrRewrite, header, rewrite);
        }

        return this;
      }

      get(header, parser) {
        header = normalizeHeader(header);

        if (header) {
          const key = utils.findKey(this, header);

          if (key) {
            const value = this[key];

            if (!parser) {
              return value;
            }

            if (parser === true) {
              return parseTokens(value);
            }

            if (utils.isFunction(parser)) {
              return parser.call(this, value, key);
            }

            if (utils.isRegExp(parser)) {
              return parser.exec(value);
            }

            throw new TypeError('parser must be boolean|regexp|function');
          }
        }
      }

      has(header, matcher) {
        header = normalizeHeader(header);

        if (header) {
          const key = utils.findKey(this, header);

          return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
        }

        return false;
      }

      delete(header, matcher) {
        const self = this;
        let deleted = false;

        function deleteHeader(_header) {
          _header = normalizeHeader(_header);

          if (_header) {
            const key = utils.findKey(self, _header);

            if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
              delete self[key];

              deleted = true;
            }
          }
        }

        if (utils.isArray(header)) {
          header.forEach(deleteHeader);
        } else {
          deleteHeader(header);
        }

        return deleted;
      }

      clear(matcher) {
        const keys = Object.keys(this);
        let i = keys.length;
        let deleted = false;

        while (i--) {
          const key = keys[i];
          if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
            delete this[key];
            deleted = true;
          }
        }

        return deleted;
      }

      normalize(format) {
        const self = this;
        const headers = {};

        utils.forEach(this, (value, header) => {
          const key = utils.findKey(headers, header);

          if (key) {
            self[key] = normalizeValue(value);
            delete self[header];
            return;
          }

          const normalized = format ? formatHeader(header) : String(header).trim();

          if (normalized !== header) {
            delete self[header];
          }

          self[normalized] = normalizeValue(value);

          headers[normalized] = true;
        });

        return this;
      }

      concat(...targets) {
        return this.constructor.concat(this, ...targets);
      }

      toJSON(asStrings) {
        const obj = Object.create(null);

        utils.forEach(this, (value, header) => {
          value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value);
        });

        return obj;
      }

      [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
      }

      toString() {
        return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
      }

      get [Symbol.toStringTag]() {
        return 'AxiosHeaders';
      }

      static from(thing) {
        return thing instanceof this ? thing : new this(thing);
      }

      static concat(first, ...targets) {
        const computed = new this(first);

        targets.forEach((target) => computed.set(target));

        return computed;
      }

      static accessor(header) {
        const internals = this[$internals] = (this[$internals] = {
          accessors: {}
        });

        const accessors = internals.accessors;
        const prototype = this.prototype;

        function defineAccessor(_header) {
          const lHeader = normalizeHeader(_header);

          if (!accessors[lHeader]) {
            buildAccessors(prototype, _header);
            accessors[lHeader] = true;
          }
        }

        utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

        return this;
      }
    }

    AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

    utils.freezeMethods(AxiosHeaders.prototype);
    utils.freezeMethods(AxiosHeaders);

    var AxiosHeaders$1 = AxiosHeaders;

    /**
     * Transform the data for a request or a response
     *
     * @param {Array|Function} fns A single function or Array of functions
     * @param {?Object} response The response object
     *
     * @returns {*} The resulting transformed data
     */
    function transformData(fns, response) {
      const config = this || defaults$1;
      const context = response || config;
      const headers = AxiosHeaders$1.from(context.headers);
      let data = context.data;

      utils.forEach(fns, function transform(fn) {
        data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
      });

      headers.normalize();

      return data;
    }

    function isCancel(value) {
      return !!(value && value.__CANCEL__);
    }

    /**
     * A `CanceledError` is an object that is thrown when an operation is canceled.
     *
     * @param {string=} message The message.
     * @param {Object=} config The config.
     * @param {Object=} request The request.
     *
     * @returns {CanceledError} The created error.
     */
    function CanceledError(message, config, request) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
      this.name = 'CanceledError';
    }

    utils.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });

    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     *
     * @returns {object} The response.
     */
    function settle(resolve, reject, response) {
      const validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError(
          'Request failed with status code ' + response.status,
          [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    }

    var cookies = platform.isStandardBrowserEnv ?

    // Standard browser envs support document.cookie
      (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            const cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));

            if (utils.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }

            if (utils.isString(path)) {
              cookie.push('path=' + path);
            }

            if (utils.isString(domain)) {
              cookie.push('domain=' + domain);
            }

            if (secure === true) {
              cookie.push('secure');
            }

            document.cookie = cookie.join('; ');
          },

          read: function read(name) {
            const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return (match ? decodeURIComponent(match[3]) : null);
          },

          remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
          }
        };
      })() :

    // Non standard browser env (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() { return null; },
          remove: function remove() {}
        };
      })();

    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     *
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */
    function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    }

    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     *
     * @returns {string} The combined URL
     */
    function combineURLs(baseURL, relativeURL) {
      return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
    }

    /**
     * Creates a new URL by combining the baseURL with the requestedURL,
     * only when the requestedURL is not already an absolute URL.
     * If the requestURL is absolute, this function returns the requestedURL untouched.
     *
     * @param {string} baseURL The base URL
     * @param {string} requestedURL Absolute or relative URL to combine
     *
     * @returns {string} The combined full path
     */
    function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    }

    var isURLSameOrigin = platform.isStandardBrowserEnv ?

    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
      (function standardBrowserEnv() {
        const msie = /(msie|trident)/i.test(navigator.userAgent);
        const urlParsingNode = document.createElement('a');
        let originURL;

        /**
        * Parse a URL to discover it's components
        *
        * @param {String} url The URL to be parsed
        * @returns {Object}
        */
        function resolveURL(url) {
          let href = url;

          if (msie) {
            // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }

          urlParsingNode.setAttribute('href', href);

          // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
              urlParsingNode.pathname :
              '/' + urlParsingNode.pathname
          };
        }

        originURL = resolveURL(window.location.href);

        /**
        * Determine if a URL shares the same origin as the current location
        *
        * @param {String} requestURL The URL to test
        * @returns {boolean} True if URL shares the same origin, otherwise false
        */
        return function isURLSameOrigin(requestURL) {
          const parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
          return (parsed.protocol === originURL.protocol &&
              parsed.host === originURL.host);
        };
      })() :

      // Non standard browser envs (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      })();

    function parseProtocol(url) {
      const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match && match[1] || '';
    }

    /**
     * Calculate data maxRate
     * @param {Number} [samplesCount= 10]
     * @param {Number} [min= 1000]
     * @returns {Function}
     */
    function speedometer(samplesCount, min) {
      samplesCount = samplesCount || 10;
      const bytes = new Array(samplesCount);
      const timestamps = new Array(samplesCount);
      let head = 0;
      let tail = 0;
      let firstSampleTS;

      min = min !== undefined ? min : 1000;

      return function push(chunkLength) {
        const now = Date.now();

        const startedAt = timestamps[tail];

        if (!firstSampleTS) {
          firstSampleTS = now;
        }

        bytes[head] = chunkLength;
        timestamps[head] = now;

        let i = tail;
        let bytesCount = 0;

        while (i !== head) {
          bytesCount += bytes[i++];
          i = i % samplesCount;
        }

        head = (head + 1) % samplesCount;

        if (head === tail) {
          tail = (tail + 1) % samplesCount;
        }

        if (now - firstSampleTS < min) {
          return;
        }

        const passed = startedAt && now - startedAt;

        return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
      };
    }

    function progressEventReducer(listener, isDownloadStream) {
      let bytesNotified = 0;
      const _speedometer = speedometer(50, 250);

      return e => {
        const loaded = e.loaded;
        const total = e.lengthComputable ? e.total : undefined;
        const progressBytes = loaded - bytesNotified;
        const rate = _speedometer(progressBytes);
        const inRange = loaded <= total;

        bytesNotified = loaded;

        const data = {
          loaded,
          total,
          progress: total ? (loaded / total) : undefined,
          bytes: progressBytes,
          rate: rate ? rate : undefined,
          estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
          event: e
        };

        data[isDownloadStream ? 'download' : 'upload'] = true;

        listener(data);
      };
    }

    const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

    var xhrAdapter = isXHRAdapterSupported && function (config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        let requestData = config.data;
        const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
        const responseType = config.responseType;
        let onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }

          if (config.signal) {
            config.signal.removeEventListener('abort', onCanceled);
          }
        }

        if (utils.isFormData(requestData)) {
          if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
            requestHeaders.setContentType(false); // Let the browser set it
          } else {
            requestHeaders.setContentType('multipart/form-data;', false); // mobile/desktop app frameworks
          }
        }

        let request = new XMLHttpRequest();

        // HTTP basic authentication
        if (config.auth) {
          const username = config.auth.username || '';
          const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
          requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
        }

        const fullPath = buildFullPath(config.baseURL, config.url);

        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

        // Set the request timeout in MS
        request.timeout = config.timeout;

        function onloadend() {
          if (!request) {
            return;
          }
          // Prepare the response
          const responseHeaders = AxiosHeaders$1.from(
            'getAllResponseHeaders' in request && request.getAllResponseHeaders()
          );
          const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
            request.responseText : request.response;
          const response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };

          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);

          // Clean up request
          request = null;
        }

        if ('onloadend' in request) {
          // Use onloadend if available
          request.onloadend = onloadend;
        } else {
          // Listen for ready state to emulate onloadend
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }

            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
              return;
            }
            // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'
            setTimeout(onloadend);
          };
        }

        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }

          reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

          // Clean up request
          request = null;
        };

        // Handle low level network errors
        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

          // Clean up request
          request = null;
        };

        // Handle timeout
        request.ontimeout = function handleTimeout() {
          let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
          const transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(new AxiosError(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config,
            request));

          // Clean up request
          request = null;
        };

        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (platform.isStandardBrowserEnv) {
          // Add xsrf header
          const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath))
            && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

          if (xsrfValue) {
            requestHeaders.set(config.xsrfHeaderName, xsrfValue);
          }
        }

        // Remove Content-Type if data is undefined
        requestData === undefined && requestHeaders.setContentType(null);

        // Add headers to the request
        if ('setRequestHeader' in request) {
          utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
            request.setRequestHeader(key, val);
          });
        }

        // Add withCredentials to request if needed
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }

        // Add responseType to request if needed
        if (responseType && responseType !== 'json') {
          request.responseType = config.responseType;
        }

        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') {
          request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
        }

        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) {
          request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
        }

        if (config.cancelToken || config.signal) {
          // Handle cancellation
          // eslint-disable-next-line func-names
          onCanceled = cancel => {
            if (!request) {
              return;
            }
            reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
            request.abort();
            request = null;
          };

          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
          }
        }

        const protocol = parseProtocol(fullPath);

        if (protocol && platform.protocols.indexOf(protocol) === -1) {
          reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
          return;
        }


        // Send the request
        request.send(requestData || null);
      });
    };

    const knownAdapters = {
      http: httpAdapter,
      xhr: xhrAdapter
    };

    utils.forEach(knownAdapters, (fn, value) => {
      if(fn) {
        try {
          Object.defineProperty(fn, 'name', {value});
        } catch (e) {
          // eslint-disable-next-line no-empty
        }
        Object.defineProperty(fn, 'adapterName', {value});
      }
    });

    var adapters = {
      getAdapter: (adapters) => {
        adapters = utils.isArray(adapters) ? adapters : [adapters];

        const {length} = adapters;
        let nameOrAdapter;
        let adapter;

        for (let i = 0; i < length; i++) {
          nameOrAdapter = adapters[i];
          if((adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
            break;
          }
        }

        if (!adapter) {
          if (adapter === false) {
            throw new AxiosError(
              `Adapter ${nameOrAdapter} is not supported by the environment`,
              'ERR_NOT_SUPPORT'
            );
          }

          throw new Error(
            utils.hasOwnProp(knownAdapters, nameOrAdapter) ?
              `Adapter '${nameOrAdapter}' is not available in the build` :
              `Unknown adapter '${nameOrAdapter}'`
          );
        }

        if (!utils.isFunction(adapter)) {
          throw new TypeError('adapter is not a function');
        }

        return adapter;
      },
      adapters: knownAdapters
    };

    /**
     * Throws a `CanceledError` if cancellation has been requested.
     *
     * @param {Object} config The config that is to be used for the request
     *
     * @returns {void}
     */
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }

      if (config.signal && config.signal.aborted) {
        throw new CanceledError(null, config);
      }
    }

    /**
     * Dispatch a request to the server using the configured adapter.
     *
     * @param {object} config The config that is to be used for the request
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    function dispatchRequest(config) {
      throwIfCancellationRequested(config);

      config.headers = AxiosHeaders$1.from(config.headers);

      // Transform request data
      config.data = transformData.call(
        config,
        config.transformRequest
      );

      if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
        config.headers.setContentType('application/x-www-form-urlencoded', false);
      }

      const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);

        // Transform response data
        response.data = transformData.call(
          config,
          config.transformResponse,
          response
        );

        response.headers = AxiosHeaders$1.from(response.headers);

        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);

          // Transform response data
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              config.transformResponse,
              reason.response
            );
            reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
          }
        }

        return Promise.reject(reason);
      });
    }

    const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;

    /**
     * Config-specific merge-function which creates a new config-object
     * by merging two configuration objects together.
     *
     * @param {Object} config1
     * @param {Object} config2
     *
     * @returns {Object} New object resulting from merging config2 to config1
     */
    function mergeConfig(config1, config2) {
      // eslint-disable-next-line no-param-reassign
      config2 = config2 || {};
      const config = {};

      function getMergedValue(target, source, caseless) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge.call({caseless}, target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }

      // eslint-disable-next-line consistent-return
      function mergeDeepProperties(a, b, caseless) {
        if (!utils.isUndefined(b)) {
          return getMergedValue(a, b, caseless);
        } else if (!utils.isUndefined(a)) {
          return getMergedValue(undefined, a, caseless);
        }
      }

      // eslint-disable-next-line consistent-return
      function valueFromConfig2(a, b) {
        if (!utils.isUndefined(b)) {
          return getMergedValue(undefined, b);
        }
      }

      // eslint-disable-next-line consistent-return
      function defaultToConfig2(a, b) {
        if (!utils.isUndefined(b)) {
          return getMergedValue(undefined, b);
        } else if (!utils.isUndefined(a)) {
          return getMergedValue(undefined, a);
        }
      }

      // eslint-disable-next-line consistent-return
      function mergeDirectKeys(a, b, prop) {
        if (prop in config2) {
          return getMergedValue(a, b);
        } else if (prop in config1) {
          return getMergedValue(undefined, a);
        }
      }

      const mergeMap = {
        url: valueFromConfig2,
        method: valueFromConfig2,
        data: valueFromConfig2,
        baseURL: defaultToConfig2,
        transformRequest: defaultToConfig2,
        transformResponse: defaultToConfig2,
        paramsSerializer: defaultToConfig2,
        timeout: defaultToConfig2,
        timeoutMessage: defaultToConfig2,
        withCredentials: defaultToConfig2,
        adapter: defaultToConfig2,
        responseType: defaultToConfig2,
        xsrfCookieName: defaultToConfig2,
        xsrfHeaderName: defaultToConfig2,
        onUploadProgress: defaultToConfig2,
        onDownloadProgress: defaultToConfig2,
        decompress: defaultToConfig2,
        maxContentLength: defaultToConfig2,
        maxBodyLength: defaultToConfig2,
        beforeRedirect: defaultToConfig2,
        transport: defaultToConfig2,
        httpAgent: defaultToConfig2,
        httpsAgent: defaultToConfig2,
        cancelToken: defaultToConfig2,
        socketPath: defaultToConfig2,
        responseEncoding: defaultToConfig2,
        validateStatus: mergeDirectKeys,
        headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
      };

      utils.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
        const merge = mergeMap[prop] || mergeDeepProperties;
        const configValue = merge(config1[prop], config2[prop], prop);
        (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
      });

      return config;
    }

    const VERSION = "1.4.0";

    const validators$1 = {};

    // eslint-disable-next-line func-names
    ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
      validators$1[type] = function validator(thing) {
        return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
      };
    });

    const deprecatedWarnings = {};

    /**
     * Transitional option validator
     *
     * @param {function|boolean?} validator - set to false if the transitional option has been removed
     * @param {string?} version - deprecated version / removed since version
     * @param {string?} message - some message with additional info
     *
     * @returns {function}
     */
    validators$1.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
      }

      // eslint-disable-next-line func-names
      return (value, opt, opts) => {
        if (validator === false) {
          throw new AxiosError(
            formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
            AxiosError.ERR_DEPRECATED
          );
        }

        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          // eslint-disable-next-line no-console
          console.warn(
            formatMessage(
              opt,
              ' has been deprecated since v' + version + ' and will be removed in the near future'
            )
          );
        }

        return validator ? validator(value, opt, opts) : true;
      };
    };

    /**
     * Assert object's properties type
     *
     * @param {object} options
     * @param {object} schema
     * @param {boolean?} allowUnknown
     *
     * @returns {object}
     */

    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== 'object') {
        throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
      }
      const keys = Object.keys(options);
      let i = keys.length;
      while (i-- > 0) {
        const opt = keys[i];
        const validator = schema[opt];
        if (validator) {
          const value = options[opt];
          const result = value === undefined || validator(value, opt, options);
          if (result !== true) {
            throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }

    var validator = {
      assertOptions,
      validators: validators$1
    };

    const validators = validator.validators;

    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     *
     * @return {Axios} A new instance of Axios
     */
    class Axios {
      constructor(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
          request: new InterceptorManager$1(),
          response: new InterceptorManager$1()
        };
      }

      /**
       * Dispatch a request
       *
       * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
       * @param {?Object} config
       *
       * @returns {Promise} The Promise to be fulfilled
       */
      request(configOrUrl, config) {
        /*eslint no-param-reassign:0*/
        // Allow for axios('example/url'[, config]) a la fetch API
        if (typeof configOrUrl === 'string') {
          config = config || {};
          config.url = configOrUrl;
        } else {
          config = configOrUrl || {};
        }

        config = mergeConfig(this.defaults, config);

        const {transitional, paramsSerializer, headers} = config;

        if (transitional !== undefined) {
          validator.assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean)
          }, false);
        }

        if (paramsSerializer != null) {
          if (utils.isFunction(paramsSerializer)) {
            config.paramsSerializer = {
              serialize: paramsSerializer
            };
          } else {
            validator.assertOptions(paramsSerializer, {
              encode: validators.function,
              serialize: validators.function
            }, true);
          }
        }

        // Set config.method
        config.method = (config.method || this.defaults.method || 'get').toLowerCase();

        let contextHeaders;

        // Flatten headers
        contextHeaders = headers && utils.merge(
          headers.common,
          headers[config.method]
        );

        contextHeaders && utils.forEach(
          ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
          (method) => {
            delete headers[method];
          }
        );

        config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

        // filter out skipped interceptors
        const requestInterceptorChain = [];
        let synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
            return;
          }

          synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

          requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        });

        const responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });

        let promise;
        let i = 0;
        let len;

        if (!synchronousRequestInterceptors) {
          const chain = [dispatchRequest.bind(this), undefined];
          chain.unshift.apply(chain, requestInterceptorChain);
          chain.push.apply(chain, responseInterceptorChain);
          len = chain.length;

          promise = Promise.resolve(config);

          while (i < len) {
            promise = promise.then(chain[i++], chain[i++]);
          }

          return promise;
        }

        len = requestInterceptorChain.length;

        let newConfig = config;

        i = 0;

        while (i < len) {
          const onFulfilled = requestInterceptorChain[i++];
          const onRejected = requestInterceptorChain[i++];
          try {
            newConfig = onFulfilled(newConfig);
          } catch (error) {
            onRejected.call(this, error);
            break;
          }
        }

        try {
          promise = dispatchRequest.call(this, newConfig);
        } catch (error) {
          return Promise.reject(error);
        }

        i = 0;
        len = responseInterceptorChain.length;

        while (i < len) {
          promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        }

        return promise;
      }

      getUri(config) {
        config = mergeConfig(this.defaults, config);
        const fullPath = buildFullPath(config.baseURL, config.url);
        return buildURL(fullPath, config.params, config.paramsSerializer);
      }
    }

    // Provide aliases for supported request methods
    utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });

    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      /*eslint func-names:0*/

      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
          return this.request(mergeConfig(config || {}, {
            method,
            headers: isForm ? {
              'Content-Type': 'multipart/form-data'
            } : {},
            url,
            data
          }));
        };
      }

      Axios.prototype[method] = generateHTTPMethod();

      Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
    });

    var Axios$1 = Axios;

    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @param {Function} executor The executor function.
     *
     * @returns {CancelToken}
     */
    class CancelToken {
      constructor(executor) {
        if (typeof executor !== 'function') {
          throw new TypeError('executor must be a function.');
        }

        let resolvePromise;

        this.promise = new Promise(function promiseExecutor(resolve) {
          resolvePromise = resolve;
        });

        const token = this;

        // eslint-disable-next-line func-names
        this.promise.then(cancel => {
          if (!token._listeners) return;

          let i = token._listeners.length;

          while (i-- > 0) {
            token._listeners[i](cancel);
          }
          token._listeners = null;
        });

        // eslint-disable-next-line func-names
        this.promise.then = onfulfilled => {
          let _resolve;
          // eslint-disable-next-line func-names
          const promise = new Promise(resolve => {
            token.subscribe(resolve);
            _resolve = resolve;
          }).then(onfulfilled);

          promise.cancel = function reject() {
            token.unsubscribe(_resolve);
          };

          return promise;
        };

        executor(function cancel(message, config, request) {
          if (token.reason) {
            // Cancellation has already been requested
            return;
          }

          token.reason = new CanceledError(message, config, request);
          resolvePromise(token.reason);
        });
      }

      /**
       * Throws a `CanceledError` if cancellation has been requested.
       */
      throwIfRequested() {
        if (this.reason) {
          throw this.reason;
        }
      }

      /**
       * Subscribe to the cancel signal
       */

      subscribe(listener) {
        if (this.reason) {
          listener(this.reason);
          return;
        }

        if (this._listeners) {
          this._listeners.push(listener);
        } else {
          this._listeners = [listener];
        }
      }

      /**
       * Unsubscribe from the cancel signal
       */

      unsubscribe(listener) {
        if (!this._listeners) {
          return;
        }
        const index = this._listeners.indexOf(listener);
        if (index !== -1) {
          this._listeners.splice(index, 1);
        }
      }

      /**
       * Returns an object that contains a new `CancelToken` and a function that, when called,
       * cancels the `CancelToken`.
       */
      static source() {
        let cancel;
        const token = new CancelToken(function executor(c) {
          cancel = c;
        });
        return {
          token,
          cancel
        };
      }
    }

    var CancelToken$1 = CancelToken;

    /**
     * Syntactic sugar for invoking a function and expanding an array for arguments.
     *
     * Common use case would be to use `Function.prototype.apply`.
     *
     *  ```js
     *  function f(x, y, z) {}
     *  var args = [1, 2, 3];
     *  f.apply(null, args);
     *  ```
     *
     * With `spread` this example can be re-written.
     *
     *  ```js
     *  spread(function(x, y, z) {})([1, 2, 3]);
     *  ```
     *
     * @param {Function} callback
     *
     * @returns {Function}
     */
    function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    }

    /**
     * Determines whether the payload is an error thrown by Axios
     *
     * @param {*} payload The value to test
     *
     * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
     */
    function isAxiosError(payload) {
      return utils.isObject(payload) && (payload.isAxiosError === true);
    }

    const HttpStatusCode = {
      Continue: 100,
      SwitchingProtocols: 101,
      Processing: 102,
      EarlyHints: 103,
      Ok: 200,
      Created: 201,
      Accepted: 202,
      NonAuthoritativeInformation: 203,
      NoContent: 204,
      ResetContent: 205,
      PartialContent: 206,
      MultiStatus: 207,
      AlreadyReported: 208,
      ImUsed: 226,
      MultipleChoices: 300,
      MovedPermanently: 301,
      Found: 302,
      SeeOther: 303,
      NotModified: 304,
      UseProxy: 305,
      Unused: 306,
      TemporaryRedirect: 307,
      PermanentRedirect: 308,
      BadRequest: 400,
      Unauthorized: 401,
      PaymentRequired: 402,
      Forbidden: 403,
      NotFound: 404,
      MethodNotAllowed: 405,
      NotAcceptable: 406,
      ProxyAuthenticationRequired: 407,
      RequestTimeout: 408,
      Conflict: 409,
      Gone: 410,
      LengthRequired: 411,
      PreconditionFailed: 412,
      PayloadTooLarge: 413,
      UriTooLong: 414,
      UnsupportedMediaType: 415,
      RangeNotSatisfiable: 416,
      ExpectationFailed: 417,
      ImATeapot: 418,
      MisdirectedRequest: 421,
      UnprocessableEntity: 422,
      Locked: 423,
      FailedDependency: 424,
      TooEarly: 425,
      UpgradeRequired: 426,
      PreconditionRequired: 428,
      TooManyRequests: 429,
      RequestHeaderFieldsTooLarge: 431,
      UnavailableForLegalReasons: 451,
      InternalServerError: 500,
      NotImplemented: 501,
      BadGateway: 502,
      ServiceUnavailable: 503,
      GatewayTimeout: 504,
      HttpVersionNotSupported: 505,
      VariantAlsoNegotiates: 506,
      InsufficientStorage: 507,
      LoopDetected: 508,
      NotExtended: 510,
      NetworkAuthenticationRequired: 511,
    };

    Object.entries(HttpStatusCode).forEach(([key, value]) => {
      HttpStatusCode[value] = key;
    });

    var HttpStatusCode$1 = HttpStatusCode;

    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     *
     * @returns {Axios} A new instance of Axios
     */
    function createInstance(defaultConfig) {
      const context = new Axios$1(defaultConfig);
      const instance = bind(Axios$1.prototype.request, context);

      // Copy axios.prototype to instance
      utils.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

      // Copy context to instance
      utils.extend(instance, context, null, {allOwnKeys: true});

      // Factory for creating new instances
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };

      return instance;
    }

    // Create the default instance to be exported
    const axios = createInstance(defaults$1);

    // Expose Axios class to allow class inheritance
    axios.Axios = Axios$1;

    // Expose Cancel & CancelToken
    axios.CanceledError = CanceledError;
    axios.CancelToken = CancelToken$1;
    axios.isCancel = isCancel;
    axios.VERSION = VERSION;
    axios.toFormData = toFormData;

    // Expose AxiosError class
    axios.AxiosError = AxiosError;

    // alias for CanceledError for backward compatibility
    axios.Cancel = axios.CanceledError;

    // Expose all/spread
    axios.all = function all(promises) {
      return Promise.all(promises);
    };

    axios.spread = spread;

    // Expose isAxiosError
    axios.isAxiosError = isAxiosError;

    // Expose mergeConfig
    axios.mergeConfig = mergeConfig;

    axios.AxiosHeaders = AxiosHeaders$1;

    axios.formToJSON = thing => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);

    axios.HttpStatusCode = HttpStatusCode$1;

    axios.default = axios;

    // this module should only have a default export
    var axios$1 = axios;

    /* src/routes/FaqScreen.svelte generated by Svelte v3.58.0 */

    const { console: console_1$2 } = globals;
    const file$7 = "src/routes/FaqScreen.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (73:16) {#if question.id == answer.question }
    function create_if_block$2(ctx) {
    	let li;
    	let div;
    	let t0_value = /*answer*/ ctx[7].answer + "";
    	let t0;
    	let t1;
    	let hr;

    	const block = {
    		c: function create() {
    			li = element("li");
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			hr = element("hr");
    			attr_dev(div, "class", "accordion-body text-sm opacity-8");
    			add_location(div, file$7, 74, 20, 2200);
    			attr_dev(li, "class", "svelte-wts1w8");
    			add_location(li, file$7, 73, 18, 2175);
    			add_location(hr, file$7, 78, 18, 2354);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, div);
    			append_dev(div, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, hr, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*answersArray*/ 2 && t0_value !== (t0_value = /*answer*/ ctx[7].answer + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(hr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(73:16) {#if question.id == answer.question }",
    		ctx
    	});

    	return block;
    }

    // (72:16) {#each answersArray.slice().reverse() as answer}
    function create_each_block_1$1(ctx) {
    	let if_block_anchor;
    	let if_block = /*question*/ ctx[4].id == /*answer*/ ctx[7].question && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*question*/ ctx[4].id == /*answer*/ ctx[7].question) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(72:16) {#each answersArray.slice().reverse() as answer}",
    		ctx
    	});

    	return block;
    }

    // (50:8) {#each questionsArray.slice().reverse() as question}
    function create_each_block$2(ctx) {
    	let div1;
    	let h5;
    	let button;
    	let t0_value = /*question*/ ctx[4].question + "";
    	let t0;
    	let button_data_bs_target_value;
    	let button_aria_controls_value;
    	let h5_id_value;
    	let t1;
    	let div0;
    	let ol;
    	let div0_id_value;
    	let div0_aria_labelledby_value;
    	let t2;
    	let each_value_1 = /*answersArray*/ ctx[1].slice().reverse();
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h5 = element("h5");
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");
    			ol = element("ol");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			attr_dev(button, "class", "accordion-button border-bottom font-weight-bold svelte-wts1w8");
    			attr_dev(button, "type", "button");
    			attr_dev(button, "data-bs-toggle", "collapse");
    			attr_dev(button, "data-bs-target", button_data_bs_target_value = "#collapse" + /*question*/ ctx[4].id);
    			attr_dev(button, "aria-expanded", "true");
    			attr_dev(button, "aria-controls", button_aria_controls_value = "collapse" + /*question*/ ctx[4].id);
    			add_location(button, file$7, 53, 14, 1403);
    			attr_dev(h5, "class", "accordion-header");
    			attr_dev(h5, "id", h5_id_value = "heading" + /*question*/ ctx[4].id);
    			add_location(h5, file$7, 52, 12, 1333);
    			attr_dev(ol, "class", "svelte-wts1w8");
    			add_location(ol, file$7, 70, 14, 2033);
    			attr_dev(div0, "id", div0_id_value = "collapse" + /*question*/ ctx[4].id);
    			attr_dev(div0, "class", "accordion-collapse collapse");
    			attr_dev(div0, "aria-labelledby", div0_aria_labelledby_value = "heading" + /*question*/ ctx[4].id);
    			attr_dev(div0, "data-bs-parent", "#accordionRental");
    			add_location(div0, file$7, 64, 12, 1808);
    			attr_dev(div1, "class", "accordion-item mb-3");
    			add_location(div1, file$7, 51, 10, 1287);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h5);
    			append_dev(h5, button);
    			append_dev(button, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, ol);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ol, null);
    				}
    			}

    			append_dev(div1, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*questionsArray*/ 1 && t0_value !== (t0_value = /*question*/ ctx[4].question + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*questionsArray*/ 1 && button_data_bs_target_value !== (button_data_bs_target_value = "#collapse" + /*question*/ ctx[4].id)) {
    				attr_dev(button, "data-bs-target", button_data_bs_target_value);
    			}

    			if (dirty & /*questionsArray*/ 1 && button_aria_controls_value !== (button_aria_controls_value = "collapse" + /*question*/ ctx[4].id)) {
    				attr_dev(button, "aria-controls", button_aria_controls_value);
    			}

    			if (dirty & /*questionsArray*/ 1 && h5_id_value !== (h5_id_value = "heading" + /*question*/ ctx[4].id)) {
    				attr_dev(h5, "id", h5_id_value);
    			}

    			if (dirty & /*answersArray, questionsArray*/ 3) {
    				each_value_1 = /*answersArray*/ ctx[1].slice().reverse();
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ol, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (dirty & /*questionsArray*/ 1 && div0_id_value !== (div0_id_value = "collapse" + /*question*/ ctx[4].id)) {
    				attr_dev(div0, "id", div0_id_value);
    			}

    			if (dirty & /*questionsArray*/ 1 && div0_aria_labelledby_value !== (div0_aria_labelledby_value = "heading" + /*question*/ ctx[4].id)) {
    				attr_dev(div0, "aria-labelledby", div0_aria_labelledby_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(50:8) {#each questionsArray.slice().reverse() as question}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div5;
    	let div1;
    	let div0;
    	let h1;
    	let t0;
    	let small;
    	let t1;
    	let t2_value = /*questionsArray*/ ctx[0].length + "";
    	let t2;
    	let t3;
    	let t4;
    	let p;
    	let t6;
    	let div4;
    	let div3;
    	let div2;
    	let each_value = /*questionsArray*/ ctx[0].slice().reverse();
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text("FAQ : Foire aux questions ");
    			small = element("small");
    			t1 = text("(");
    			t2 = text(t2_value);
    			t3 = text(")");
    			t4 = space();
    			p = element("p");
    			p.textContent = "Vous avez des questions ? On y répond ! Voici les questions les plus\n        posées sur Yuccan Lead.";
    			t6 = space();
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(small, file$7, 38, 34, 896);
    			add_location(h1, file$7, 37, 6, 857);
    			add_location(p, file$7, 40, 6, 957);
    			attr_dev(div0, "class", "col-md-12 mx-auto text-center");
    			add_location(div0, file$7, 36, 4, 807);
    			attr_dev(div1, "class", "row my-5");
    			add_location(div1, file$7, 35, 2, 780);
    			attr_dev(div2, "class", "accordion");
    			attr_dev(div2, "id", "accordionRental");
    			add_location(div2, file$7, 48, 6, 1163);
    			attr_dev(div3, "class", "col-md-12 mx-auto");
    			add_location(div3, file$7, 47, 4, 1125);
    			attr_dev(div4, "class", "row");
    			add_location(div4, file$7, 46, 2, 1103);
    			attr_dev(div5, "class", "mb-5 pb-5 container");
    			add_location(div5, file$7, 34, 0, 744);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(h1, small);
    			append_dev(small, t1);
    			append_dev(small, t2);
    			append_dev(small, t3);
    			append_dev(div0, t4);
    			append_dev(div0, p);
    			append_dev(div5, t6);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div2, null);
    				}
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*questionsArray*/ 1 && t2_value !== (t2_value = /*questionsArray*/ ctx[0].length + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*questionsArray, answersArray*/ 3) {
    				each_value = /*questionsArray*/ ctx[0].slice().reverse();
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div2, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FaqScreen', slots, []);

    	onMount(async () => {
    		getQuestions();
    		getAnswers();
    	});

    	let questionsArray = [];

    	async function getQuestions() {
    		$$invalidate(0, questionsArray = []);

    		try {
    			let response = await axios$1.get("http://127.0.0.1:8080/api/questions/");
    			$$invalidate(0, questionsArray = response.data);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	let answersArray = [];

    	async function getAnswers() {
    		$$invalidate(1, answersArray = []);
    		console.log("response");

    		try {
    			let response = await axios$1.get("http://127.0.0.1:8080/api/answers/");
    			console.log(response);
    			$$invalidate(1, answersArray = response.data);
    		} catch(error) {
    			console.log(error);
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<FaqScreen> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		axios: axios$1,
    		questionsArray,
    		getQuestions,
    		answersArray,
    		getAnswers
    	});

    	$$self.$inject_state = $$props => {
    		if ('questionsArray' in $$props) $$invalidate(0, questionsArray = $$props.questionsArray);
    		if ('answersArray' in $$props) $$invalidate(1, answersArray = $$props.answersArray);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [questionsArray, answersArray];
    }

    class FaqScreen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FaqScreen",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var sweetalert2_all = {exports: {}};

    /*!
    * sweetalert2 v11.7.3
    * Released under the MIT License.
    */

    (function (module, exports) {
    	(function (global, factory) {
    	  module.exports = factory() ;
    	})(commonjsGlobal, (function () {
    	  /**
    	   * This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
    	   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
    	   * This is the approach that Babel will probably take to implement private methods/fields
    	   *   https://github.com/tc39/proposal-private-methods
    	   *   https://github.com/babel/babel/pull/7555
    	   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
    	   *   then we can use that language feature.
    	   */

    	  var privateProps = {
    	    awaitingPromise: new WeakMap(),
    	    promise: new WeakMap(),
    	    innerParams: new WeakMap(),
    	    domCache: new WeakMap()
    	  };

    	  const swalPrefix = 'swal2-';

    	  /**
    	   * @param {string[]} items
    	   * @returns {object}
    	   */
    	  const prefix = items => {
    	    const result = {};
    	    for (const i in items) {
    	      result[items[i]] = swalPrefix + items[i];
    	    }
    	    return result;
    	  };
    	  const swalClasses = prefix(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'no-transition', 'toast', 'toast-shown', 'show', 'hide', 'close', 'title', 'html-container', 'actions', 'confirm', 'deny', 'cancel', 'default-outline', 'footer', 'icon', 'icon-content', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'label', 'textarea', 'inputerror', 'input-label', 'validation-message', 'progress-steps', 'active-progress-step', 'progress-step', 'progress-step-line', 'loader', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen', 'rtl', 'timer-progress-bar', 'timer-progress-bar-container', 'scrollbar-measure', 'icon-success', 'icon-warning', 'icon-info', 'icon-question', 'icon-error']);
    	  const iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

    	  const consolePrefix = 'SweetAlert2:';

    	  /**
    	   * Filter the unique values into a new array
    	   *
    	   * @param {Array} arr
    	   * @returns {Array}
    	   */
    	  const uniqueArray = arr => {
    	    const result = [];
    	    for (let i = 0; i < arr.length; i++) {
    	      if (result.indexOf(arr[i]) === -1) {
    	        result.push(arr[i]);
    	      }
    	    }
    	    return result;
    	  };

    	  /**
    	   * Capitalize the first letter of a string
    	   *
    	   * @param {string} str
    	   * @returns {string}
    	   */
    	  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

    	  /**
    	   * Standardize console warnings
    	   *
    	   * @param {string | Array} message
    	   */
    	  const warn = message => {
    	    console.warn(`${consolePrefix} ${typeof message === 'object' ? message.join(' ') : message}`);
    	  };

    	  /**
    	   * Standardize console errors
    	   *
    	   * @param {string} message
    	   */
    	  const error = message => {
    	    console.error(`${consolePrefix} ${message}`);
    	  };

    	  /**
    	   * Private global state for `warnOnce`
    	   *
    	   * @type {Array}
    	   * @private
    	   */
    	  const previousWarnOnceMessages = [];

    	  /**
    	   * Show a console warning, but only if it hasn't already been shown
    	   *
    	   * @param {string} message
    	   */
    	  const warnOnce = message => {
    	    if (!previousWarnOnceMessages.includes(message)) {
    	      previousWarnOnceMessages.push(message);
    	      warn(message);
    	    }
    	  };

    	  /**
    	   * Show a one-time console warning about deprecated params/methods
    	   *
    	   * @param {string} deprecatedParam
    	   * @param {string} useInstead
    	   */
    	  const warnAboutDeprecation = (deprecatedParam, useInstead) => {
    	    warnOnce(`"${deprecatedParam}" is deprecated and will be removed in the next major release. Please use "${useInstead}" instead.`);
    	  };

    	  /**
    	   * If `arg` is a function, call it (with no arguments or context) and return the result.
    	   * Otherwise, just pass the value through
    	   *
    	   * @param {Function | any} arg
    	   * @returns {any}
    	   */
    	  const callIfFunction = arg => typeof arg === 'function' ? arg() : arg;

    	  /**
    	   * @param {any} arg
    	   * @returns {boolean}
    	   */
    	  const hasToPromiseFn = arg => arg && typeof arg.toPromise === 'function';

    	  /**
    	   * @param {any} arg
    	   * @returns {Promise}
    	   */
    	  const asPromise = arg => hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg);

    	  /**
    	   * @param {any} arg
    	   * @returns {boolean}
    	   */
    	  const isPromise = arg => arg && Promise.resolve(arg) === arg;

    	  /**
    	   * Gets the popup container which contains the backdrop and the popup itself.
    	   *
    	   * @returns {HTMLElement | null}
    	   */
    	  const getContainer = () => document.body.querySelector(`.${swalClasses.container}`);

    	  /**
    	   * @param {string} selectorString
    	   * @returns {HTMLElement | null}
    	   */
    	  const elementBySelector = selectorString => {
    	    const container = getContainer();
    	    return container ? container.querySelector(selectorString) : null;
    	  };

    	  /**
    	   * @param {string} className
    	   * @returns {HTMLElement | null}
    	   */
    	  const elementByClass = className => {
    	    return elementBySelector(`.${className}`);
    	  };

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getPopup = () => elementByClass(swalClasses.popup);

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getIcon = () => elementByClass(swalClasses.icon);

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getIconContent = () => elementByClass(swalClasses['icon-content']);

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getTitle = () => elementByClass(swalClasses.title);

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getHtmlContainer = () => elementByClass(swalClasses['html-container']);

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getImage = () => elementByClass(swalClasses.image);

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getProgressSteps = () => elementByClass(swalClasses['progress-steps']);

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getValidationMessage = () => elementByClass(swalClasses['validation-message']);

    	  /**
    	   * @returns {HTMLButtonElement | null}
    	   */
    	  const getConfirmButton = () => /** @type {HTMLButtonElement} */elementBySelector(`.${swalClasses.actions} .${swalClasses.confirm}`);

    	  /**
    	   * @returns {HTMLButtonElement | null}
    	   */
    	  const getCancelButton = () => /** @type {HTMLButtonElement} */elementBySelector(`.${swalClasses.actions} .${swalClasses.cancel}`);

    	  /**
    	   * @returns {HTMLButtonElement | null}
    	   */
    	  const getDenyButton = () => /** @type {HTMLButtonElement} */elementBySelector(`.${swalClasses.actions} .${swalClasses.deny}`);

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getInputLabel = () => elementByClass(swalClasses['input-label']);

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getLoader = () => elementBySelector(`.${swalClasses.loader}`);

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getActions = () => elementByClass(swalClasses.actions);

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getFooter = () => elementByClass(swalClasses.footer);

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getTimerProgressBar = () => elementByClass(swalClasses['timer-progress-bar']);

    	  /**
    	   * @returns {HTMLElement | null}
    	   */
    	  const getCloseButton = () => elementByClass(swalClasses.close);

    	  // https://github.com/jkup/focusable/blob/master/index.js
    	  const focusable = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls],
  summary
`;
    	  /**
    	   * @returns {HTMLElement[]}
    	   */
    	  const getFocusableElements = () => {
    	    const focusableElementsWithTabindex = Array.from(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'))
    	    // sort according to tabindex
    	    .sort((a, b) => {
    	      const tabindexA = parseInt(a.getAttribute('tabindex'));
    	      const tabindexB = parseInt(b.getAttribute('tabindex'));
    	      if (tabindexA > tabindexB) {
    	        return 1;
    	      } else if (tabindexA < tabindexB) {
    	        return -1;
    	      }
    	      return 0;
    	    });
    	    const otherFocusableElements = Array.from(getPopup().querySelectorAll(focusable)).filter(el => el.getAttribute('tabindex') !== '-1');
    	    return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements)).filter(el => isVisible$1(el));
    	  };

    	  /**
    	   * @returns {boolean}
    	   */
    	  const isModal = () => {
    	    return hasClass(document.body, swalClasses.shown) && !hasClass(document.body, swalClasses['toast-shown']) && !hasClass(document.body, swalClasses['no-backdrop']);
    	  };

    	  /**
    	   * @returns {boolean}
    	   */
    	  const isToast = () => {
    	    return getPopup() && hasClass(getPopup(), swalClasses.toast);
    	  };

    	  /**
    	   * @returns {boolean}
    	   */
    	  const isLoading = () => {
    	    return getPopup().hasAttribute('data-loading');
    	  };

    	  // Remember state in cases where opening and handling a modal will fiddle with it.
    	  const states = {
    	    previousBodyPadding: null
    	  };

    	  /**
    	   * Securely set innerHTML of an element
    	   * https://github.com/sweetalert2/sweetalert2/issues/1926
    	   *
    	   * @param {HTMLElement} elem
    	   * @param {string} html
    	   */
    	  const setInnerHtml = (elem, html) => {
    	    elem.textContent = '';
    	    if (html) {
    	      const parser = new DOMParser();
    	      const parsed = parser.parseFromString(html, `text/html`);
    	      Array.from(parsed.querySelector('head').childNodes).forEach(child => {
    	        elem.appendChild(child);
    	      });
    	      Array.from(parsed.querySelector('body').childNodes).forEach(child => {
    	        if (child instanceof HTMLVideoElement || child instanceof HTMLAudioElement) {
    	          elem.appendChild(child.cloneNode(true)); // https://github.com/sweetalert2/sweetalert2/issues/2507
    	        } else {
    	          elem.appendChild(child);
    	        }
    	      });
    	    }
    	  };

    	  /**
    	   * @param {HTMLElement} elem
    	   * @param {string} className
    	   * @returns {boolean}
    	   */
    	  const hasClass = (elem, className) => {
    	    if (!className) {
    	      return false;
    	    }
    	    const classList = className.split(/\s+/);
    	    for (let i = 0; i < classList.length; i++) {
    	      if (!elem.classList.contains(classList[i])) {
    	        return false;
    	      }
    	    }
    	    return true;
    	  };

    	  /**
    	   * @param {HTMLElement} elem
    	   * @param {SweetAlertOptions} params
    	   */
    	  const removeCustomClasses = (elem, params) => {
    	    Array.from(elem.classList).forEach(className => {
    	      if (!Object.values(swalClasses).includes(className) && !Object.values(iconTypes).includes(className) && !Object.values(params.showClass).includes(className)) {
    	        elem.classList.remove(className);
    	      }
    	    });
    	  };

    	  /**
    	   * @param {HTMLElement} elem
    	   * @param {SweetAlertOptions} params
    	   * @param {string} className
    	   */
    	  const applyCustomClass = (elem, params, className) => {
    	    removeCustomClasses(elem, params);
    	    if (params.customClass && params.customClass[className]) {
    	      if (typeof params.customClass[className] !== 'string' && !params.customClass[className].forEach) {
    	        warn(`Invalid type of customClass.${className}! Expected string or iterable object, got "${typeof params.customClass[className]}"`);
    	        return;
    	      }
    	      addClass(elem, params.customClass[className]);
    	    }
    	  };

    	  /**
    	   * @param {HTMLElement} popup
    	   * @param {import('./renderers/renderInput').InputClass} inputClass
    	   * @returns {HTMLInputElement | null}
    	   */
    	  const getInput$1 = (popup, inputClass) => {
    	    if (!inputClass) {
    	      return null;
    	    }
    	    switch (inputClass) {
    	      case 'select':
    	      case 'textarea':
    	      case 'file':
    	        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses[inputClass]}`);
    	      case 'checkbox':
    	        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.checkbox} input`);
    	      case 'radio':
    	        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.radio} input:checked`) || popup.querySelector(`.${swalClasses.popup} > .${swalClasses.radio} input:first-child`);
    	      case 'range':
    	        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.range} input`);
    	      default:
    	        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.input}`);
    	    }
    	  };

    	  /**
    	   * @param {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} input
    	   */
    	  const focusInput = input => {
    	    input.focus();

    	    // place cursor at end of text in text input
    	    if (input.type !== 'file') {
    	      // http://stackoverflow.com/a/2345915
    	      const val = input.value;
    	      input.value = '';
    	      input.value = val;
    	    }
    	  };

    	  /**
    	   * @param {HTMLElement | HTMLElement[] | null} target
    	   * @param {string | string[] | readonly string[]} classList
    	   * @param {boolean} condition
    	   */
    	  const toggleClass = (target, classList, condition) => {
    	    if (!target || !classList) {
    	      return;
    	    }
    	    if (typeof classList === 'string') {
    	      classList = classList.split(/\s+/).filter(Boolean);
    	    }
    	    classList.forEach(className => {
    	      if (Array.isArray(target)) {
    	        target.forEach(elem => {
    	          condition ? elem.classList.add(className) : elem.classList.remove(className);
    	        });
    	      } else {
    	        condition ? target.classList.add(className) : target.classList.remove(className);
    	      }
    	    });
    	  };

    	  /**
    	   * @param {HTMLElement | HTMLElement[] | null} target
    	   * @param {string | string[] | readonly string[]} classList
    	   */
    	  const addClass = (target, classList) => {
    	    toggleClass(target, classList, true);
    	  };

    	  /**
    	   * @param {HTMLElement | HTMLElement[] | null} target
    	   * @param {string | string[] | readonly string[]} classList
    	   */
    	  const removeClass = (target, classList) => {
    	    toggleClass(target, classList, false);
    	  };

    	  /**
    	   * Get direct child of an element by class name
    	   *
    	   * @param {HTMLElement} elem
    	   * @param {string} className
    	   * @returns {HTMLElement | undefined}
    	   */
    	  const getDirectChildByClass = (elem, className) => {
    	    const children = Array.from(elem.children);
    	    for (let i = 0; i < children.length; i++) {
    	      const child = children[i];
    	      if (child instanceof HTMLElement && hasClass(child, className)) {
    	        return child;
    	      }
    	    }
    	  };

    	  /**
    	   * @param {HTMLElement} elem
    	   * @param {string} property
    	   * @param {*} value
    	   */
    	  const applyNumericalStyle = (elem, property, value) => {
    	    if (value === `${parseInt(value)}`) {
    	      value = parseInt(value);
    	    }
    	    if (value || parseInt(value) === 0) {
    	      elem.style[property] = typeof value === 'number' ? `${value}px` : value;
    	    } else {
    	      elem.style.removeProperty(property);
    	    }
    	  };

    	  /**
    	   * @param {HTMLElement} elem
    	   * @param {string} display
    	   */
    	  const show = function (elem) {
    	    let display = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'flex';
    	    elem.style.display = display;
    	  };

    	  /**
    	   * @param {HTMLElement} elem
    	   */
    	  const hide = elem => {
    	    elem.style.display = 'none';
    	  };

    	  /**
    	   * @param {HTMLElement} parent
    	   * @param {string} selector
    	   * @param {string} property
    	   * @param {string} value
    	   */
    	  const setStyle = (parent, selector, property, value) => {
    	    /** @type {HTMLElement} */
    	    const el = parent.querySelector(selector);
    	    if (el) {
    	      el.style[property] = value;
    	    }
    	  };

    	  /**
    	   * @param {HTMLElement} elem
    	   * @param {any} condition
    	   * @param {string} display
    	   */
    	  const toggle = function (elem, condition) {
    	    let display = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'flex';
    	    condition ? show(elem, display) : hide(elem);
    	  };

    	  /**
    	   * borrowed from jquery $(elem).is(':visible') implementation
    	   *
    	   * @param {HTMLElement} elem
    	   * @returns {boolean}
    	   */
    	  const isVisible$1 = elem => !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));

    	  /**
    	   * @returns {boolean}
    	   */
    	  const allButtonsAreHidden = () => !isVisible$1(getConfirmButton()) && !isVisible$1(getDenyButton()) && !isVisible$1(getCancelButton());

    	  /**
    	   * @param {HTMLElement} elem
    	   * @returns {boolean}
    	   */
    	  const isScrollable = elem => !!(elem.scrollHeight > elem.clientHeight);

    	  /**
    	   * borrowed from https://stackoverflow.com/a/46352119
    	   *
    	   * @param {HTMLElement} elem
    	   * @returns {boolean}
    	   */
    	  const hasCssAnimation = elem => {
    	    const style = window.getComputedStyle(elem);
    	    const animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
    	    const transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
    	    return animDuration > 0 || transDuration > 0;
    	  };

    	  /**
    	   * @param {number} timer
    	   * @param {boolean} reset
    	   */
    	  const animateTimerProgressBar = function (timer) {
    	    let reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    	    const timerProgressBar = getTimerProgressBar();
    	    if (isVisible$1(timerProgressBar)) {
    	      if (reset) {
    	        timerProgressBar.style.transition = 'none';
    	        timerProgressBar.style.width = '100%';
    	      }
    	      setTimeout(() => {
    	        timerProgressBar.style.transition = `width ${timer / 1000}s linear`;
    	        timerProgressBar.style.width = '0%';
    	      }, 10);
    	    }
    	  };
    	  const stopTimerProgressBar = () => {
    	    const timerProgressBar = getTimerProgressBar();
    	    const timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    	    timerProgressBar.style.removeProperty('transition');
    	    timerProgressBar.style.width = '100%';
    	    const timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    	    const timerProgressBarPercent = timerProgressBarWidth / timerProgressBarFullWidth * 100;
    	    timerProgressBar.style.width = `${timerProgressBarPercent}%`;
    	  };

    	  const RESTORE_FOCUS_TIMEOUT = 100;

    	  /** @type {GlobalState} */
    	  const globalState = {};
    	  const focusPreviousActiveElement = () => {
    	    if (globalState.previousActiveElement instanceof HTMLElement) {
    	      globalState.previousActiveElement.focus();
    	      globalState.previousActiveElement = null;
    	    } else if (document.body) {
    	      document.body.focus();
    	    }
    	  };

    	  /**
    	   * Restore previous active (focused) element
    	   *
    	   * @param {boolean} returnFocus
    	   * @returns {Promise}
    	   */
    	  const restoreActiveElement = returnFocus => {
    	    return new Promise(resolve => {
    	      if (!returnFocus) {
    	        return resolve();
    	      }
    	      const x = window.scrollX;
    	      const y = window.scrollY;
    	      globalState.restoreFocusTimeout = setTimeout(() => {
    	        focusPreviousActiveElement();
    	        resolve();
    	      }, RESTORE_FOCUS_TIMEOUT); // issues/900

    	      window.scrollTo(x, y);
    	    });
    	  };

    	  /**
    	   * Detect Node env
    	   *
    	   * @returns {boolean}
    	   */
    	  const isNodeEnv = () => typeof window === 'undefined' || typeof document === 'undefined';

    	  const sweetHTML = `
 <div aria-labelledby="${swalClasses.title}" aria-describedby="${swalClasses['html-container']}" class="${swalClasses.popup}" tabindex="-1">
   <button type="button" class="${swalClasses.close}"></button>
   <ul class="${swalClasses['progress-steps']}"></ul>
   <div class="${swalClasses.icon}"></div>
   <img class="${swalClasses.image}" />
   <h2 class="${swalClasses.title}" id="${swalClasses.title}"></h2>
   <div class="${swalClasses['html-container']}" id="${swalClasses['html-container']}"></div>
   <input class="${swalClasses.input}" />
   <input type="file" class="${swalClasses.file}" />
   <div class="${swalClasses.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${swalClasses.select}"></select>
   <div class="${swalClasses.radio}"></div>
   <label for="${swalClasses.checkbox}" class="${swalClasses.checkbox}">
     <input type="checkbox" />
     <span class="${swalClasses.label}"></span>
   </label>
   <textarea class="${swalClasses.textarea}"></textarea>
   <div class="${swalClasses['validation-message']}" id="${swalClasses['validation-message']}"></div>
   <div class="${swalClasses.actions}">
     <div class="${swalClasses.loader}"></div>
     <button type="button" class="${swalClasses.confirm}"></button>
     <button type="button" class="${swalClasses.deny}"></button>
     <button type="button" class="${swalClasses.cancel}"></button>
   </div>
   <div class="${swalClasses.footer}"></div>
   <div class="${swalClasses['timer-progress-bar-container']}">
     <div class="${swalClasses['timer-progress-bar']}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g, '');

    	  /**
    	   * @returns {boolean}
    	   */
    	  const resetOldContainer = () => {
    	    const oldContainer = getContainer();
    	    if (!oldContainer) {
    	      return false;
    	    }
    	    oldContainer.remove();
    	    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]);
    	    return true;
    	  };
    	  const resetValidationMessage$1 = () => {
    	    globalState.currentInstance.resetValidationMessage();
    	  };
    	  const addInputChangeListeners = () => {
    	    const popup = getPopup();
    	    const input = getDirectChildByClass(popup, swalClasses.input);
    	    const file = getDirectChildByClass(popup, swalClasses.file);
    	    /** @type {HTMLInputElement} */
    	    const range = popup.querySelector(`.${swalClasses.range} input`);
    	    /** @type {HTMLOutputElement} */
    	    const rangeOutput = popup.querySelector(`.${swalClasses.range} output`);
    	    const select = getDirectChildByClass(popup, swalClasses.select);
    	    /** @type {HTMLInputElement} */
    	    const checkbox = popup.querySelector(`.${swalClasses.checkbox} input`);
    	    const textarea = getDirectChildByClass(popup, swalClasses.textarea);
    	    input.oninput = resetValidationMessage$1;
    	    file.onchange = resetValidationMessage$1;
    	    select.onchange = resetValidationMessage$1;
    	    checkbox.onchange = resetValidationMessage$1;
    	    textarea.oninput = resetValidationMessage$1;
    	    range.oninput = () => {
    	      resetValidationMessage$1();
    	      rangeOutput.value = range.value;
    	    };
    	    range.onchange = () => {
    	      resetValidationMessage$1();
    	      rangeOutput.value = range.value;
    	    };
    	  };

    	  /**
    	   * @param {string | HTMLElement} target
    	   * @returns {HTMLElement}
    	   */
    	  const getTarget = target => typeof target === 'string' ? document.querySelector(target) : target;

    	  /**
    	   * @param {SweetAlertOptions} params
    	   */
    	  const setupAccessibility = params => {
    	    const popup = getPopup();
    	    popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
    	    popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');
    	    if (!params.toast) {
    	      popup.setAttribute('aria-modal', 'true');
    	    }
    	  };

    	  /**
    	   * @param {HTMLElement} targetElement
    	   */
    	  const setupRTL = targetElement => {
    	    if (window.getComputedStyle(targetElement).direction === 'rtl') {
    	      addClass(getContainer(), swalClasses.rtl);
    	    }
    	  };

    	  /**
    	   * Add modal + backdrop + no-war message for Russians to DOM
    	   *
    	   * @param {SweetAlertOptions} params
    	   */
    	  const init = params => {
    	    // Clean up the old popup container if it exists
    	    const oldContainerExisted = resetOldContainer();

    	    /* istanbul ignore if */
    	    if (isNodeEnv()) {
    	      error('SweetAlert2 requires document to initialize');
    	      return;
    	    }
    	    const container = document.createElement('div');
    	    container.className = swalClasses.container;
    	    if (oldContainerExisted) {
    	      addClass(container, swalClasses['no-transition']);
    	    }
    	    setInnerHtml(container, sweetHTML);
    	    const targetElement = getTarget(params.target);
    	    targetElement.appendChild(container);
    	    setupAccessibility(params);
    	    setupRTL(targetElement);
    	    addInputChangeListeners();
    	  };

    	  /**
    	   * @param {HTMLElement | object | string} param
    	   * @param {HTMLElement} target
    	   */
    	  const parseHtmlToContainer = (param, target) => {
    	    // DOM element
    	    if (param instanceof HTMLElement) {
    	      target.appendChild(param);
    	    }

    	    // Object
    	    else if (typeof param === 'object') {
    	      handleObject(param, target);
    	    }

    	    // Plain string
    	    else if (param) {
    	      setInnerHtml(target, param);
    	    }
    	  };

    	  /**
    	   * @param {object} param
    	   * @param {HTMLElement} target
    	   */
    	  const handleObject = (param, target) => {
    	    // JQuery element(s)
    	    if (param.jquery) {
    	      handleJqueryElem(target, param);
    	    }

    	    // For other objects use their string representation
    	    else {
    	      setInnerHtml(target, param.toString());
    	    }
    	  };

    	  /**
    	   * @param {HTMLElement} target
    	   * @param {HTMLElement} elem
    	   */
    	  const handleJqueryElem = (target, elem) => {
    	    target.textContent = '';
    	    if (0 in elem) {
    	      for (let i = 0; (i in elem); i++) {
    	        target.appendChild(elem[i].cloneNode(true));
    	      }
    	    } else {
    	      target.appendChild(elem.cloneNode(true));
    	    }
    	  };

    	  /**
    	   * @returns {'webkitAnimationEnd' | 'animationend' | false}
    	   */
    	  const animationEndEvent = (() => {
    	    // Prevent run in Node env
    	    /* istanbul ignore if */
    	    if (isNodeEnv()) {
    	      return false;
    	    }
    	    const testEl = document.createElement('div');
    	    const transEndEventNames = {
    	      WebkitAnimation: 'webkitAnimationEnd',
    	      // Chrome, Safari and Opera
    	      animation: 'animationend' // Standard syntax
    	    };

    	    for (const i in transEndEventNames) {
    	      if (Object.prototype.hasOwnProperty.call(transEndEventNames, i) && typeof testEl.style[i] !== 'undefined') {
    	        return transEndEventNames[i];
    	      }
    	    }
    	    return false;
    	  })();

    	  /**
    	   * Measure scrollbar width for padding body during modal show/hide
    	   * https://github.com/twbs/bootstrap/blob/master/js/src/modal.js
    	   *
    	   * @returns {number}
    	   */
    	  const measureScrollbar = () => {
    	    const scrollDiv = document.createElement('div');
    	    scrollDiv.className = swalClasses['scrollbar-measure'];
    	    document.body.appendChild(scrollDiv);
    	    const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    	    document.body.removeChild(scrollDiv);
    	    return scrollbarWidth;
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const renderActions = (instance, params) => {
    	    const actions = getActions();
    	    const loader = getLoader();

    	    // Actions (buttons) wrapper
    	    if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) {
    	      hide(actions);
    	    } else {
    	      show(actions);
    	    }

    	    // Custom class
    	    applyCustomClass(actions, params, 'actions');

    	    // Render all the buttons
    	    renderButtons(actions, loader, params);

    	    // Loader
    	    setInnerHtml(loader, params.loaderHtml);
    	    applyCustomClass(loader, params, 'loader');
    	  };

    	  /**
    	   * @param {HTMLElement} actions
    	   * @param {HTMLElement} loader
    	   * @param {SweetAlertOptions} params
    	   */
    	  function renderButtons(actions, loader, params) {
    	    const confirmButton = getConfirmButton();
    	    const denyButton = getDenyButton();
    	    const cancelButton = getCancelButton();

    	    // Render buttons
    	    renderButton(confirmButton, 'confirm', params);
    	    renderButton(denyButton, 'deny', params);
    	    renderButton(cancelButton, 'cancel', params);
    	    handleButtonsStyling(confirmButton, denyButton, cancelButton, params);
    	    if (params.reverseButtons) {
    	      if (params.toast) {
    	        actions.insertBefore(cancelButton, confirmButton);
    	        actions.insertBefore(denyButton, confirmButton);
    	      } else {
    	        actions.insertBefore(cancelButton, loader);
    	        actions.insertBefore(denyButton, loader);
    	        actions.insertBefore(confirmButton, loader);
    	      }
    	    }
    	  }

    	  /**
    	   * @param {HTMLElement} confirmButton
    	   * @param {HTMLElement} denyButton
    	   * @param {HTMLElement} cancelButton
    	   * @param {SweetAlertOptions} params
    	   */
    	  function handleButtonsStyling(confirmButton, denyButton, cancelButton, params) {
    	    if (!params.buttonsStyling) {
    	      removeClass([confirmButton, denyButton, cancelButton], swalClasses.styled);
    	      return;
    	    }
    	    addClass([confirmButton, denyButton, cancelButton], swalClasses.styled);

    	    // Buttons background colors
    	    if (params.confirmButtonColor) {
    	      confirmButton.style.backgroundColor = params.confirmButtonColor;
    	      addClass(confirmButton, swalClasses['default-outline']);
    	    }
    	    if (params.denyButtonColor) {
    	      denyButton.style.backgroundColor = params.denyButtonColor;
    	      addClass(denyButton, swalClasses['default-outline']);
    	    }
    	    if (params.cancelButtonColor) {
    	      cancelButton.style.backgroundColor = params.cancelButtonColor;
    	      addClass(cancelButton, swalClasses['default-outline']);
    	    }
    	  }

    	  /**
    	   * @param {HTMLElement} button
    	   * @param {'confirm' | 'deny' | 'cancel'} buttonType
    	   * @param {SweetAlertOptions} params
    	   */
    	  function renderButton(button, buttonType, params) {
    	    toggle(button, params[`show${capitalizeFirstLetter(buttonType)}Button`], 'inline-block');
    	    setInnerHtml(button, params[`${buttonType}ButtonText`]); // Set caption text
    	    button.setAttribute('aria-label', params[`${buttonType}ButtonAriaLabel`]); // ARIA label

    	    // Add buttons custom classes
    	    button.className = swalClasses[buttonType];
    	    applyCustomClass(button, params, `${buttonType}Button`);
    	    addClass(button, params[`${buttonType}ButtonClass`]);
    	  }

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const renderCloseButton = (instance, params) => {
    	    const closeButton = getCloseButton();
    	    setInnerHtml(closeButton, params.closeButtonHtml);

    	    // Custom class
    	    applyCustomClass(closeButton, params, 'closeButton');
    	    toggle(closeButton, params.showCloseButton);
    	    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const renderContainer = (instance, params) => {
    	    const container = getContainer();
    	    if (!container) {
    	      return;
    	    }
    	    handleBackdropParam(container, params.backdrop);
    	    handlePositionParam(container, params.position);
    	    handleGrowParam(container, params.grow);

    	    // Custom class
    	    applyCustomClass(container, params, 'container');
    	  };

    	  /**
    	   * @param {HTMLElement} container
    	   * @param {SweetAlertOptions['backdrop']} backdrop
    	   */
    	  function handleBackdropParam(container, backdrop) {
    	    if (typeof backdrop === 'string') {
    	      container.style.background = backdrop;
    	    } else if (!backdrop) {
    	      addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
    	    }
    	  }

    	  /**
    	   * @param {HTMLElement} container
    	   * @param {SweetAlertOptions['position']} position
    	   */
    	  function handlePositionParam(container, position) {
    	    if (position in swalClasses) {
    	      addClass(container, swalClasses[position]);
    	    } else {
    	      warn('The "position" parameter is not valid, defaulting to "center"');
    	      addClass(container, swalClasses.center);
    	    }
    	  }

    	  /**
    	   * @param {HTMLElement} container
    	   * @param {SweetAlertOptions['grow']} grow
    	   */
    	  function handleGrowParam(container, grow) {
    	    if (grow && typeof grow === 'string') {
    	      const growClass = `grow-${grow}`;
    	      if (growClass in swalClasses) {
    	        addClass(container, swalClasses[growClass]);
    	      }
    	    }
    	  }

    	  /// <reference path="../../../../sweetalert2.d.ts"/>

    	  /** @type {InputClass[]} */
    	  const inputClasses = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const renderInput = (instance, params) => {
    	    const popup = getPopup();
    	    const innerParams = privateProps.innerParams.get(instance);
    	    const rerender = !innerParams || params.input !== innerParams.input;
    	    inputClasses.forEach(inputClass => {
    	      const inputContainer = getDirectChildByClass(popup, swalClasses[inputClass]);

    	      // set attributes
    	      setAttributes(inputClass, params.inputAttributes);

    	      // set class
    	      inputContainer.className = swalClasses[inputClass];
    	      if (rerender) {
    	        hide(inputContainer);
    	      }
    	    });
    	    if (params.input) {
    	      if (rerender) {
    	        showInput(params);
    	      }
    	      // set custom class
    	      setCustomClass(params);
    	    }
    	  };

    	  /**
    	   * @param {SweetAlertOptions} params
    	   */
    	  const showInput = params => {
    	    if (!renderInputType[params.input]) {
    	      error(`Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "${params.input}"`);
    	      return;
    	    }
    	    const inputContainer = getInputContainer(params.input);
    	    const input = renderInputType[params.input](inputContainer, params);
    	    show(inputContainer);

    	    // input autofocus
    	    if (params.inputAutoFocus) {
    	      setTimeout(() => {
    	        focusInput(input);
    	      });
    	    }
    	  };

    	  /**
    	   * @param {HTMLInputElement} input
    	   */
    	  const removeAttributes = input => {
    	    for (let i = 0; i < input.attributes.length; i++) {
    	      const attrName = input.attributes[i].name;
    	      if (!['type', 'value', 'style'].includes(attrName)) {
    	        input.removeAttribute(attrName);
    	      }
    	    }
    	  };

    	  /**
    	   * @param {InputClass} inputClass
    	   * @param {SweetAlertOptions['inputAttributes']} inputAttributes
    	   */
    	  const setAttributes = (inputClass, inputAttributes) => {
    	    const input = getInput$1(getPopup(), inputClass);
    	    if (!input) {
    	      return;
    	    }
    	    removeAttributes(input);
    	    for (const attr in inputAttributes) {
    	      input.setAttribute(attr, inputAttributes[attr]);
    	    }
    	  };

    	  /**
    	   * @param {SweetAlertOptions} params
    	   */
    	  const setCustomClass = params => {
    	    const inputContainer = getInputContainer(params.input);
    	    if (typeof params.customClass === 'object') {
    	      addClass(inputContainer, params.customClass.input);
    	    }
    	  };

    	  /**
    	   * @param {HTMLInputElement | HTMLTextAreaElement} input
    	   * @param {SweetAlertOptions} params
    	   */
    	  const setInputPlaceholder = (input, params) => {
    	    if (!input.placeholder || params.inputPlaceholder) {
    	      input.placeholder = params.inputPlaceholder;
    	    }
    	  };

    	  /**
    	   * @param {Input} input
    	   * @param {Input} prependTo
    	   * @param {SweetAlertOptions} params
    	   */
    	  const setInputLabel = (input, prependTo, params) => {
    	    if (params.inputLabel) {
    	      input.id = swalClasses.input;
    	      const label = document.createElement('label');
    	      const labelClass = swalClasses['input-label'];
    	      label.setAttribute('for', input.id);
    	      label.className = labelClass;
    	      if (typeof params.customClass === 'object') {
    	        addClass(label, params.customClass.inputLabel);
    	      }
    	      label.innerText = params.inputLabel;
    	      prependTo.insertAdjacentElement('beforebegin', label);
    	    }
    	  };

    	  /**
    	   * @param {SweetAlertOptions['input']} inputType
    	   * @returns {HTMLElement}
    	   */
    	  const getInputContainer = inputType => {
    	    return getDirectChildByClass(getPopup(), swalClasses[inputType] || swalClasses.input);
    	  };

    	  /**
    	   * @param {HTMLInputElement | HTMLOutputElement | HTMLTextAreaElement} input
    	   * @param {SweetAlertOptions['inputValue']} inputValue
    	   */
    	  const checkAndSetInputValue = (input, inputValue) => {
    	    if (['string', 'number'].includes(typeof inputValue)) {
    	      input.value = `${inputValue}`;
    	    } else if (!isPromise(inputValue)) {
    	      warn(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof inputValue}"`);
    	    }
    	  };

    	  /** @type {Record<string, (input: Input | HTMLElement, params: SweetAlertOptions) => Input>} */
    	  const renderInputType = {};

    	  /**
    	   * @param {HTMLInputElement} input
    	   * @param {SweetAlertOptions} params
    	   * @returns {HTMLInputElement}
    	   */
    	  renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = (input, params) => {
    	    checkAndSetInputValue(input, params.inputValue);
    	    setInputLabel(input, input, params);
    	    setInputPlaceholder(input, params);
    	    input.type = params.input;
    	    return input;
    	  };

    	  /**
    	   * @param {HTMLInputElement} input
    	   * @param {SweetAlertOptions} params
    	   * @returns {HTMLInputElement}
    	   */
    	  renderInputType.file = (input, params) => {
    	    setInputLabel(input, input, params);
    	    setInputPlaceholder(input, params);
    	    return input;
    	  };

    	  /**
    	   * @param {HTMLInputElement} range
    	   * @param {SweetAlertOptions} params
    	   * @returns {HTMLInputElement}
    	   */
    	  renderInputType.range = (range, params) => {
    	    const rangeInput = range.querySelector('input');
    	    const rangeOutput = range.querySelector('output');
    	    checkAndSetInputValue(rangeInput, params.inputValue);
    	    rangeInput.type = params.input;
    	    checkAndSetInputValue(rangeOutput, params.inputValue);
    	    setInputLabel(rangeInput, range, params);
    	    return range;
    	  };

    	  /**
    	   * @param {HTMLSelectElement} select
    	   * @param {SweetAlertOptions} params
    	   * @returns {HTMLSelectElement}
    	   */
    	  renderInputType.select = (select, params) => {
    	    select.textContent = '';
    	    if (params.inputPlaceholder) {
    	      const placeholder = document.createElement('option');
    	      setInnerHtml(placeholder, params.inputPlaceholder);
    	      placeholder.value = '';
    	      placeholder.disabled = true;
    	      placeholder.selected = true;
    	      select.appendChild(placeholder);
    	    }
    	    setInputLabel(select, select, params);
    	    return select;
    	  };

    	  /**
    	   * @param {HTMLInputElement} radio
    	   * @returns {HTMLInputElement}
    	   */
    	  renderInputType.radio = radio => {
    	    radio.textContent = '';
    	    return radio;
    	  };

    	  /**
    	   * @param {HTMLLabelElement} checkboxContainer
    	   * @param {SweetAlertOptions} params
    	   * @returns {HTMLInputElement}
    	   */
    	  renderInputType.checkbox = (checkboxContainer, params) => {
    	    const checkbox = getInput$1(getPopup(), 'checkbox');
    	    checkbox.value = '1';
    	    checkbox.id = swalClasses.checkbox;
    	    checkbox.checked = Boolean(params.inputValue);
    	    const label = checkboxContainer.querySelector('span');
    	    setInnerHtml(label, params.inputPlaceholder);
    	    return checkbox;
    	  };

    	  /**
    	   * @param {HTMLTextAreaElement} textarea
    	   * @param {SweetAlertOptions} params
    	   * @returns {HTMLTextAreaElement}
    	   */
    	  renderInputType.textarea = (textarea, params) => {
    	    checkAndSetInputValue(textarea, params.inputValue);
    	    setInputPlaceholder(textarea, params);
    	    setInputLabel(textarea, textarea, params);

    	    /**
    	     * @param {HTMLElement} el
    	     * @returns {number}
    	     */
    	    const getMargin = el => parseInt(window.getComputedStyle(el).marginLeft) + parseInt(window.getComputedStyle(el).marginRight);

    	    // https://github.com/sweetalert2/sweetalert2/issues/2291
    	    setTimeout(() => {
    	      // https://github.com/sweetalert2/sweetalert2/issues/1699
    	      if ('MutationObserver' in window) {
    	        const initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);
    	        const textareaResizeHandler = () => {
    	          const textareaWidth = textarea.offsetWidth + getMargin(textarea);
    	          if (textareaWidth > initialPopupWidth) {
    	            getPopup().style.width = `${textareaWidth}px`;
    	          } else {
    	            getPopup().style.width = null;
    	          }
    	        };
    	        new MutationObserver(textareaResizeHandler).observe(textarea, {
    	          attributes: true,
    	          attributeFilter: ['style']
    	        });
    	      }
    	    });
    	    return textarea;
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const renderContent = (instance, params) => {
    	    const htmlContainer = getHtmlContainer();
    	    applyCustomClass(htmlContainer, params, 'htmlContainer');

    	    // Content as HTML
    	    if (params.html) {
    	      parseHtmlToContainer(params.html, htmlContainer);
    	      show(htmlContainer, 'block');
    	    }

    	    // Content as plain text
    	    else if (params.text) {
    	      htmlContainer.textContent = params.text;
    	      show(htmlContainer, 'block');
    	    }

    	    // No content
    	    else {
    	      hide(htmlContainer);
    	    }
    	    renderInput(instance, params);
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const renderFooter = (instance, params) => {
    	    const footer = getFooter();
    	    toggle(footer, params.footer);
    	    if (params.footer) {
    	      parseHtmlToContainer(params.footer, footer);
    	    }

    	    // Custom class
    	    applyCustomClass(footer, params, 'footer');
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const renderIcon = (instance, params) => {
    	    const innerParams = privateProps.innerParams.get(instance);
    	    const icon = getIcon();

    	    // if the given icon already rendered, apply the styling without re-rendering the icon
    	    if (innerParams && params.icon === innerParams.icon) {
    	      // Custom or default content
    	      setContent(icon, params);
    	      applyStyles(icon, params);
    	      return;
    	    }
    	    if (!params.icon && !params.iconHtml) {
    	      hide(icon);
    	      return;
    	    }
    	    if (params.icon && Object.keys(iconTypes).indexOf(params.icon) === -1) {
    	      error(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${params.icon}"`);
    	      hide(icon);
    	      return;
    	    }
    	    show(icon);

    	    // Custom or default content
    	    setContent(icon, params);
    	    applyStyles(icon, params);

    	    // Animate icon
    	    addClass(icon, params.showClass.icon);
    	  };

    	  /**
    	   * @param {HTMLElement} icon
    	   * @param {SweetAlertOptions} params
    	   */
    	  const applyStyles = (icon, params) => {
    	    for (const iconType in iconTypes) {
    	      if (params.icon !== iconType) {
    	        removeClass(icon, iconTypes[iconType]);
    	      }
    	    }
    	    addClass(icon, iconTypes[params.icon]);

    	    // Icon color
    	    setColor(icon, params);

    	    // Success icon background color
    	    adjustSuccessIconBackgroundColor();

    	    // Custom class
    	    applyCustomClass(icon, params, 'icon');
    	  };

    	  // Adjust success icon background color to match the popup background color
    	  const adjustSuccessIconBackgroundColor = () => {
    	    const popup = getPopup();
    	    const popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
    	    /** @type {NodeListOf<HTMLElement>} */
    	    const successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
    	    for (let i = 0; i < successIconParts.length; i++) {
    	      successIconParts[i].style.backgroundColor = popupBackgroundColor;
    	    }
    	  };
    	  const successIconHtml = `
  <div class="swal2-success-circular-line-left"></div>
  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>
  <div class="swal2-success-circular-line-right"></div>
`;
    	  const errorIconHtml = `
  <span class="swal2-x-mark">
    <span class="swal2-x-mark-line-left"></span>
    <span class="swal2-x-mark-line-right"></span>
  </span>
`;

    	  /**
    	   * @param {HTMLElement} icon
    	   * @param {SweetAlertOptions} params
    	   */
    	  const setContent = (icon, params) => {
    	    let oldContent = icon.innerHTML;
    	    let newContent;
    	    if (params.iconHtml) {
    	      newContent = iconContent(params.iconHtml);
    	    } else if (params.icon === 'success') {
    	      newContent = successIconHtml;
    	      oldContent = oldContent.replace(/ style=".*?"/g, ''); // undo adjustSuccessIconBackgroundColor()
    	    } else if (params.icon === 'error') {
    	      newContent = errorIconHtml;
    	    } else {
    	      const defaultIconHtml = {
    	        question: '?',
    	        warning: '!',
    	        info: 'i'
    	      };
    	      newContent = iconContent(defaultIconHtml[params.icon]);
    	    }
    	    if (oldContent.trim() !== newContent.trim()) {
    	      setInnerHtml(icon, newContent);
    	    }
    	  };

    	  /**
    	   * @param {HTMLElement} icon
    	   * @param {SweetAlertOptions} params
    	   */
    	  const setColor = (icon, params) => {
    	    if (!params.iconColor) {
    	      return;
    	    }
    	    icon.style.color = params.iconColor;
    	    icon.style.borderColor = params.iconColor;
    	    for (const sel of ['.swal2-success-line-tip', '.swal2-success-line-long', '.swal2-x-mark-line-left', '.swal2-x-mark-line-right']) {
    	      setStyle(icon, sel, 'backgroundColor', params.iconColor);
    	    }
    	    setStyle(icon, '.swal2-success-ring', 'borderColor', params.iconColor);
    	  };

    	  /**
    	   * @param {string} content
    	   * @returns {string}
    	   */
    	  const iconContent = content => `<div class="${swalClasses['icon-content']}">${content}</div>`;

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const renderImage = (instance, params) => {
    	    const image = getImage();
    	    if (!params.imageUrl) {
    	      hide(image);
    	      return;
    	    }
    	    show(image, '');

    	    // Src, alt
    	    image.setAttribute('src', params.imageUrl);
    	    image.setAttribute('alt', params.imageAlt);

    	    // Width, height
    	    applyNumericalStyle(image, 'width', params.imageWidth);
    	    applyNumericalStyle(image, 'height', params.imageHeight);

    	    // Class
    	    image.className = swalClasses.image;
    	    applyCustomClass(image, params, 'image');
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const renderPopup = (instance, params) => {
    	    const container = getContainer();
    	    const popup = getPopup();

    	    // Width
    	    // https://github.com/sweetalert2/sweetalert2/issues/2170
    	    if (params.toast) {
    	      applyNumericalStyle(container, 'width', params.width);
    	      popup.style.width = '100%';
    	      popup.insertBefore(getLoader(), getIcon());
    	    } else {
    	      applyNumericalStyle(popup, 'width', params.width);
    	    }

    	    // Padding
    	    applyNumericalStyle(popup, 'padding', params.padding);

    	    // Color
    	    if (params.color) {
    	      popup.style.color = params.color;
    	    }

    	    // Background
    	    if (params.background) {
    	      popup.style.background = params.background;
    	    }
    	    hide(getValidationMessage());

    	    // Classes
    	    addClasses$1(popup, params);
    	  };

    	  /**
    	   * @param {HTMLElement} popup
    	   * @param {SweetAlertOptions} params
    	   */
    	  const addClasses$1 = (popup, params) => {
    	    // Default Class + showClass when updating Swal.update({})
    	    popup.className = `${swalClasses.popup} ${isVisible$1(popup) ? params.showClass.popup : ''}`;
    	    if (params.toast) {
    	      addClass([document.documentElement, document.body], swalClasses['toast-shown']);
    	      addClass(popup, swalClasses.toast);
    	    } else {
    	      addClass(popup, swalClasses.modal);
    	    }

    	    // Custom class
    	    applyCustomClass(popup, params, 'popup');
    	    if (typeof params.customClass === 'string') {
    	      addClass(popup, params.customClass);
    	    }

    	    // Icon class (#1842)
    	    if (params.icon) {
    	      addClass(popup, swalClasses[`icon-${params.icon}`]);
    	    }
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const renderProgressSteps = (instance, params) => {
    	    const progressStepsContainer = getProgressSteps();
    	    if (!params.progressSteps || params.progressSteps.length === 0) {
    	      hide(progressStepsContainer);
    	      return;
    	    }
    	    show(progressStepsContainer);
    	    progressStepsContainer.textContent = '';
    	    if (params.currentProgressStep >= params.progressSteps.length) {
    	      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    	    }
    	    params.progressSteps.forEach((step, index) => {
    	      const stepEl = createStepElement(step);
    	      progressStepsContainer.appendChild(stepEl);
    	      if (index === params.currentProgressStep) {
    	        addClass(stepEl, swalClasses['active-progress-step']);
    	      }
    	      if (index !== params.progressSteps.length - 1) {
    	        const lineEl = createLineElement(params);
    	        progressStepsContainer.appendChild(lineEl);
    	      }
    	    });
    	  };

    	  /**
    	   * @param {string} step
    	   * @returns {HTMLLIElement}
    	   */
    	  const createStepElement = step => {
    	    const stepEl = document.createElement('li');
    	    addClass(stepEl, swalClasses['progress-step']);
    	    setInnerHtml(stepEl, step);
    	    return stepEl;
    	  };

    	  /**
    	   * @param {SweetAlertOptions} params
    	   * @returns {HTMLLIElement}
    	   */
    	  const createLineElement = params => {
    	    const lineEl = document.createElement('li');
    	    addClass(lineEl, swalClasses['progress-step-line']);
    	    if (params.progressStepsDistance) {
    	      applyNumericalStyle(lineEl, 'width', params.progressStepsDistance);
    	    }
    	    return lineEl;
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const renderTitle = (instance, params) => {
    	    const title = getTitle();
    	    toggle(title, params.title || params.titleText, 'block');
    	    if (params.title) {
    	      parseHtmlToContainer(params.title, title);
    	    }
    	    if (params.titleText) {
    	      title.innerText = params.titleText;
    	    }

    	    // Custom class
    	    applyCustomClass(title, params, 'title');
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const render = (instance, params) => {
    	    renderPopup(instance, params);
    	    renderContainer(instance, params);
    	    renderProgressSteps(instance, params);
    	    renderIcon(instance, params);
    	    renderImage(instance, params);
    	    renderTitle(instance, params);
    	    renderCloseButton(instance, params);
    	    renderContent(instance, params);
    	    renderActions(instance, params);
    	    renderFooter(instance, params);
    	    if (typeof params.didRender === 'function') {
    	      params.didRender(getPopup());
    	    }
    	  };

    	  /**
    	   * Hides loader and shows back the button which was hidden by .showLoading()
    	   */
    	  function hideLoading() {
    	    // do nothing if popup is closed
    	    const innerParams = privateProps.innerParams.get(this);
    	    if (!innerParams) {
    	      return;
    	    }
    	    const domCache = privateProps.domCache.get(this);
    	    hide(domCache.loader);
    	    if (isToast()) {
    	      if (innerParams.icon) {
    	        show(getIcon());
    	      }
    	    } else {
    	      showRelatedButton(domCache);
    	    }
    	    removeClass([domCache.popup, domCache.actions], swalClasses.loading);
    	    domCache.popup.removeAttribute('aria-busy');
    	    domCache.popup.removeAttribute('data-loading');
    	    domCache.confirmButton.disabled = false;
    	    domCache.denyButton.disabled = false;
    	    domCache.cancelButton.disabled = false;
    	  }
    	  const showRelatedButton = domCache => {
    	    const buttonToReplace = domCache.popup.getElementsByClassName(domCache.loader.getAttribute('data-button-to-replace'));
    	    if (buttonToReplace.length) {
    	      show(buttonToReplace[0], 'inline-block');
    	    } else if (allButtonsAreHidden()) {
    	      hide(domCache.actions);
    	    }
    	  };

    	  /**
    	   * Gets the input DOM node, this method works with input parameter.
    	   *
    	   * @param {SweetAlert2} instance
    	   * @returns {HTMLElement | null}
    	   */
    	  function getInput(instance) {
    	    const innerParams = privateProps.innerParams.get(instance || this);
    	    const domCache = privateProps.domCache.get(instance || this);
    	    if (!domCache) {
    	      return null;
    	    }
    	    return getInput$1(domCache.popup, innerParams.input);
    	  }

    	  /*
    	   * Global function to determine if SweetAlert2 popup is shown
    	   */
    	  const isVisible = () => {
    	    return isVisible$1(getPopup());
    	  };

    	  /*
    	   * Global function to click 'Confirm' button
    	   */
    	  const clickConfirm = () => getConfirmButton() && getConfirmButton().click();

    	  /*
    	   * Global function to click 'Deny' button
    	   */
    	  const clickDeny = () => getDenyButton() && getDenyButton().click();

    	  /*
    	   * Global function to click 'Cancel' button
    	   */
    	  const clickCancel = () => getCancelButton() && getCancelButton().click();

    	  const DismissReason = Object.freeze({
    	    cancel: 'cancel',
    	    backdrop: 'backdrop',
    	    close: 'close',
    	    esc: 'esc',
    	    timer: 'timer'
    	  });

    	  /**
    	   * @param {GlobalState} globalState
    	   */
    	  const removeKeydownHandler = globalState => {
    	    if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
    	      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
    	        capture: globalState.keydownListenerCapture
    	      });
    	      globalState.keydownHandlerAdded = false;
    	    }
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {GlobalState} globalState
    	   * @param {SweetAlertOptions} innerParams
    	   * @param {*} dismissWith
    	   */
    	  const addKeydownHandler = (instance, globalState, innerParams, dismissWith) => {
    	    removeKeydownHandler(globalState);
    	    if (!innerParams.toast) {
    	      globalState.keydownHandler = e => keydownHandler(instance, e, dismissWith);
    	      globalState.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
    	      globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
    	      globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
    	        capture: globalState.keydownListenerCapture
    	      });
    	      globalState.keydownHandlerAdded = true;
    	    }
    	  };

    	  /**
    	   * @param {number} index
    	   * @param {number} increment
    	   */
    	  const setFocus = (index, increment) => {
    	    const focusableElements = getFocusableElements();
    	    // search for visible elements and select the next possible match
    	    if (focusableElements.length) {
    	      index = index + increment;

    	      // rollover to first item
    	      if (index === focusableElements.length) {
    	        index = 0;

    	        // go to last item
    	      } else if (index === -1) {
    	        index = focusableElements.length - 1;
    	      }
    	      focusableElements[index].focus();
    	      return;
    	    }
    	    // no visible focusable elements, focus the popup
    	    getPopup().focus();
    	  };
    	  const arrowKeysNextButton = ['ArrowRight', 'ArrowDown'];
    	  const arrowKeysPreviousButton = ['ArrowLeft', 'ArrowUp'];

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {KeyboardEvent} event
    	   * @param {Function} dismissWith
    	   */
    	  const keydownHandler = (instance, event, dismissWith) => {
    	    const innerParams = privateProps.innerParams.get(instance);
    	    if (!innerParams) {
    	      return; // This instance has already been destroyed
    	    }

    	    // Ignore keydown during IME composition
    	    // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event#ignoring_keydown_during_ime_composition
    	    // https://github.com/sweetalert2/sweetalert2/issues/720
    	    // https://github.com/sweetalert2/sweetalert2/issues/2406
    	    if (event.isComposing || event.keyCode === 229) {
    	      return;
    	    }
    	    if (innerParams.stopKeydownPropagation) {
    	      event.stopPropagation();
    	    }

    	    // ENTER
    	    if (event.key === 'Enter') {
    	      handleEnter(instance, event, innerParams);
    	    }

    	    // TAB
    	    else if (event.key === 'Tab') {
    	      handleTab(event);
    	    }

    	    // ARROWS - switch focus between buttons
    	    else if ([...arrowKeysNextButton, ...arrowKeysPreviousButton].includes(event.key)) {
    	      handleArrows(event.key);
    	    }

    	    // ESC
    	    else if (event.key === 'Escape') {
    	      handleEsc(event, innerParams, dismissWith);
    	    }
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {KeyboardEvent} event
    	   * @param {SweetAlertOptions} innerParams
    	   */
    	  const handleEnter = (instance, event, innerParams) => {
    	    // https://github.com/sweetalert2/sweetalert2/issues/2386
    	    if (!callIfFunction(innerParams.allowEnterKey)) {
    	      return;
    	    }
    	    if (event.target && instance.getInput() && event.target instanceof HTMLElement && event.target.outerHTML === instance.getInput().outerHTML) {
    	      if (['textarea', 'file'].includes(innerParams.input)) {
    	        return; // do not submit
    	      }

    	      clickConfirm();
    	      event.preventDefault();
    	    }
    	  };

    	  /**
    	   * @param {KeyboardEvent} event
    	   */
    	  const handleTab = event => {
    	    const targetElement = event.target;
    	    const focusableElements = getFocusableElements();
    	    let btnIndex = -1;
    	    for (let i = 0; i < focusableElements.length; i++) {
    	      if (targetElement === focusableElements[i]) {
    	        btnIndex = i;
    	        break;
    	      }
    	    }

    	    // Cycle to the next button
    	    if (!event.shiftKey) {
    	      setFocus(btnIndex, 1);
    	    }

    	    // Cycle to the prev button
    	    else {
    	      setFocus(btnIndex, -1);
    	    }
    	    event.stopPropagation();
    	    event.preventDefault();
    	  };

    	  /**
    	   * @param {string} key
    	   */
    	  const handleArrows = key => {
    	    const confirmButton = getConfirmButton();
    	    const denyButton = getDenyButton();
    	    const cancelButton = getCancelButton();
    	    /** @type HTMLElement[] */
    	    const buttons = [confirmButton, denyButton, cancelButton];
    	    if (document.activeElement instanceof HTMLElement && !buttons.includes(document.activeElement)) {
    	      return;
    	    }
    	    const sibling = arrowKeysNextButton.includes(key) ? 'nextElementSibling' : 'previousElementSibling';
    	    let buttonToFocus = document.activeElement;
    	    for (let i = 0; i < getActions().children.length; i++) {
    	      buttonToFocus = buttonToFocus[sibling];
    	      if (!buttonToFocus) {
    	        return;
    	      }
    	      if (buttonToFocus instanceof HTMLButtonElement && isVisible$1(buttonToFocus)) {
    	        break;
    	      }
    	    }
    	    if (buttonToFocus instanceof HTMLButtonElement) {
    	      buttonToFocus.focus();
    	    }
    	  };

    	  /**
    	   * @param {KeyboardEvent} event
    	   * @param {SweetAlertOptions} innerParams
    	   * @param {Function} dismissWith
    	   */
    	  const handleEsc = (event, innerParams, dismissWith) => {
    	    if (callIfFunction(innerParams.allowEscapeKey)) {
    	      event.preventDefault();
    	      dismissWith(DismissReason.esc);
    	    }
    	  };

    	  /**
    	   * This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
    	   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
    	   * This is the approach that Babel will probably take to implement private methods/fields
    	   *   https://github.com/tc39/proposal-private-methods
    	   *   https://github.com/babel/babel/pull/7555
    	   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
    	   *   then we can use that language feature.
    	   */

    	  var privateMethods = {
    	    swalPromiseResolve: new WeakMap(),
    	    swalPromiseReject: new WeakMap()
    	  };

    	  // From https://developer.paciellogroup.com/blog/2018/06/the-current-state-of-modal-dialog-accessibility/
    	  // Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
    	  // elements not within the active modal dialog will not be surfaced if a user opens a screen
    	  // reader’s list of elements (headings, form controls, landmarks, etc.) in the document.

    	  const setAriaHidden = () => {
    	    const bodyChildren = Array.from(document.body.children);
    	    bodyChildren.forEach(el => {
    	      if (el === getContainer() || el.contains(getContainer())) {
    	        return;
    	      }
    	      if (el.hasAttribute('aria-hidden')) {
    	        el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden'));
    	      }
    	      el.setAttribute('aria-hidden', 'true');
    	    });
    	  };
    	  const unsetAriaHidden = () => {
    	    const bodyChildren = Array.from(document.body.children);
    	    bodyChildren.forEach(el => {
    	      if (el.hasAttribute('data-previous-aria-hidden')) {
    	        el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden'));
    	        el.removeAttribute('data-previous-aria-hidden');
    	      } else {
    	        el.removeAttribute('aria-hidden');
    	      }
    	    });
    	  };

    	  /* istanbul ignore file */

    	  // Fix iOS scrolling http://stackoverflow.com/q/39626302

    	  const iOSfix = () => {
    	    const iOS =
    	    // @ts-ignore
    	    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    	    if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
    	      const offset = document.body.scrollTop;
    	      document.body.style.top = `${offset * -1}px`;
    	      addClass(document.body, swalClasses.iosfix);
    	      lockBodyScroll();
    	      addBottomPaddingForTallPopups();
    	    }
    	  };

    	  /**
    	   * https://github.com/sweetalert2/sweetalert2/issues/1948
    	   */
    	  const addBottomPaddingForTallPopups = () => {
    	    const ua = navigator.userAgent;
    	    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    	    const webkit = !!ua.match(/WebKit/i);
    	    const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
    	    if (iOSSafari) {
    	      const bottomPanelHeight = 44;
    	      if (getPopup().scrollHeight > window.innerHeight - bottomPanelHeight) {
    	        getContainer().style.paddingBottom = `${bottomPanelHeight}px`;
    	      }
    	    }
    	  };

    	  /**
    	   * https://github.com/sweetalert2/sweetalert2/issues/1246
    	   */
    	  const lockBodyScroll = () => {
    	    const container = getContainer();
    	    let preventTouchMove;
    	    /**
    	     * @param {TouchEvent} event
    	     */
    	    container.ontouchstart = event => {
    	      preventTouchMove = shouldPreventTouchMove(event);
    	    };
    	    /**
    	     * @param {TouchEvent} event
    	     */
    	    container.ontouchmove = event => {
    	      if (preventTouchMove) {
    	        event.preventDefault();
    	        event.stopPropagation();
    	      }
    	    };
    	  };

    	  /**
    	   * @param {TouchEvent} event
    	   * @returns {boolean}
    	   */
    	  const shouldPreventTouchMove = event => {
    	    const target = event.target;
    	    const container = getContainer();
    	    if (isStylus(event) || isZoom(event)) {
    	      return false;
    	    }
    	    if (target === container) {
    	      return true;
    	    }
    	    if (!isScrollable(container) && target instanceof HTMLElement && target.tagName !== 'INPUT' &&
    	    // #1603
    	    target.tagName !== 'TEXTAREA' &&
    	    // #2266
    	    !(isScrollable(getHtmlContainer()) &&
    	    // #1944
    	    getHtmlContainer().contains(target))) {
    	      return true;
    	    }
    	    return false;
    	  };

    	  /**
    	   * https://github.com/sweetalert2/sweetalert2/issues/1786
    	   *
    	   * @param {*} event
    	   * @returns {boolean}
    	   */
    	  const isStylus = event => {
    	    return event.touches && event.touches.length && event.touches[0].touchType === 'stylus';
    	  };

    	  /**
    	   * https://github.com/sweetalert2/sweetalert2/issues/1891
    	   *
    	   * @param {TouchEvent} event
    	   * @returns {boolean}
    	   */
    	  const isZoom = event => {
    	    return event.touches && event.touches.length > 1;
    	  };
    	  const undoIOSfix = () => {
    	    if (hasClass(document.body, swalClasses.iosfix)) {
    	      const offset = parseInt(document.body.style.top, 10);
    	      removeClass(document.body, swalClasses.iosfix);
    	      document.body.style.top = '';
    	      document.body.scrollTop = offset * -1;
    	    }
    	  };

    	  const fixScrollbar = () => {
    	    // for queues, do not do this more than once
    	    if (states.previousBodyPadding !== null) {
    	      return;
    	    }
    	    // if the body has overflow
    	    if (document.body.scrollHeight > window.innerHeight) {
    	      // add padding so the content doesn't shift after removal of scrollbar
    	      states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
    	      document.body.style.paddingRight = `${states.previousBodyPadding + measureScrollbar()}px`;
    	    }
    	  };
    	  const undoScrollbar = () => {
    	    if (states.previousBodyPadding !== null) {
    	      document.body.style.paddingRight = `${states.previousBodyPadding}px`;
    	      states.previousBodyPadding = null;
    	    }
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {HTMLElement} container
    	   * @param {boolean} returnFocus
    	   * @param {Function} didClose
    	   */
    	  function removePopupAndResetState(instance, container, returnFocus, didClose) {
    	    if (isToast()) {
    	      triggerDidCloseAndDispose(instance, didClose);
    	    } else {
    	      restoreActiveElement(returnFocus).then(() => triggerDidCloseAndDispose(instance, didClose));
    	      removeKeydownHandler(globalState);
    	    }
    	    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    	    // workaround for #2088
    	    // for some reason removing the container in Safari will scroll the document to bottom
    	    if (isSafari) {
    	      container.setAttribute('style', 'display:none !important');
    	      container.removeAttribute('class');
    	      container.innerHTML = '';
    	    } else {
    	      container.remove();
    	    }
    	    if (isModal()) {
    	      undoScrollbar();
    	      undoIOSfix();
    	      unsetAriaHidden();
    	    }
    	    removeBodyClasses();
    	  }

    	  /**
    	   * Remove SweetAlert2 classes from body
    	   */
    	  function removeBodyClasses() {
    	    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown']]);
    	  }

    	  /**
    	   * Instance method to close sweetAlert
    	   *
    	   * @param {any} resolveValue
    	   */
    	  function close(resolveValue) {
    	    resolveValue = prepareResolveValue(resolveValue);
    	    const swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);
    	    const didClose = triggerClosePopup(this);
    	    if (this.isAwaitingPromise()) {
    	      // A swal awaiting for a promise (after a click on Confirm or Deny) cannot be dismissed anymore #2335
    	      if (!resolveValue.isDismissed) {
    	        handleAwaitingPromise(this);
    	        swalPromiseResolve(resolveValue);
    	      }
    	    } else if (didClose) {
    	      // Resolve Swal promise
    	      swalPromiseResolve(resolveValue);
    	    }
    	  }

    	  /**
    	   * @returns {boolean}
    	   */
    	  function isAwaitingPromise() {
    	    return !!privateProps.awaitingPromise.get(this);
    	  }
    	  const triggerClosePopup = instance => {
    	    const popup = getPopup();
    	    if (!popup) {
    	      return false;
    	    }
    	    const innerParams = privateProps.innerParams.get(instance);
    	    if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) {
    	      return false;
    	    }
    	    removeClass(popup, innerParams.showClass.popup);
    	    addClass(popup, innerParams.hideClass.popup);
    	    const backdrop = getContainer();
    	    removeClass(backdrop, innerParams.showClass.backdrop);
    	    addClass(backdrop, innerParams.hideClass.backdrop);
    	    handlePopupAnimation(instance, popup, innerParams);
    	    return true;
    	  };

    	  /**
    	   * @param {any} error
    	   */
    	  function rejectPromise(error) {
    	    const rejectPromise = privateMethods.swalPromiseReject.get(this);
    	    handleAwaitingPromise(this);
    	    if (rejectPromise) {
    	      // Reject Swal promise
    	      rejectPromise(error);
    	    }
    	  }

    	  /**
    	   * @param {SweetAlert2} instance
    	   */
    	  const handleAwaitingPromise = instance => {
    	    // @ts-ignore
    	    if (instance.isAwaitingPromise()) {
    	      privateProps.awaitingPromise.delete(instance);
    	      // The instance might have been previously partly destroyed, we must resume the destroy process in this case #2335
    	      if (!privateProps.innerParams.get(instance)) {
    	        // @ts-ignore
    	        instance._destroy();
    	      }
    	    }
    	  };

    	  /**
    	   * @param {any} resolveValue
    	   * @returns {SweetAlertResult}
    	   */
    	  const prepareResolveValue = resolveValue => {
    	    // When user calls Swal.close()
    	    if (typeof resolveValue === 'undefined') {
    	      return {
    	        isConfirmed: false,
    	        isDenied: false,
    	        isDismissed: true
    	      };
    	    }
    	    return Object.assign({
    	      isConfirmed: false,
    	      isDenied: false,
    	      isDismissed: false
    	    }, resolveValue);
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {HTMLElement} popup
    	   * @param {SweetAlertOptions} innerParams
    	   */
    	  const handlePopupAnimation = (instance, popup, innerParams) => {
    	    const container = getContainer();
    	    // If animation is supported, animate
    	    const animationIsSupported = animationEndEvent && hasCssAnimation(popup);
    	    if (typeof innerParams.willClose === 'function') {
    	      innerParams.willClose(popup);
    	    }
    	    if (animationIsSupported) {
    	      animatePopup(instance, popup, container, innerParams.returnFocus, innerParams.didClose);
    	    } else {
    	      // Otherwise, remove immediately
    	      removePopupAndResetState(instance, container, innerParams.returnFocus, innerParams.didClose);
    	    }
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {HTMLElement} popup
    	   * @param {HTMLElement} container
    	   * @param {boolean} returnFocus
    	   * @param {Function} didClose
    	   */
    	  const animatePopup = (instance, popup, container, returnFocus, didClose) => {
    	    globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(null, instance, container, returnFocus, didClose);
    	    popup.addEventListener(animationEndEvent, function (e) {
    	      if (e.target === popup) {
    	        globalState.swalCloseEventFinishedCallback();
    	        delete globalState.swalCloseEventFinishedCallback;
    	      }
    	    });
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {Function} didClose
    	   */
    	  const triggerDidCloseAndDispose = (instance, didClose) => {
    	    setTimeout(() => {
    	      if (typeof didClose === 'function') {
    	        // @ts-ignore
    	        didClose.bind(instance.params)();
    	      }
    	      // @ts-ignore
    	      instance._destroy();
    	    });
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {string[]} buttons
    	   * @param {boolean} disabled
    	   */
    	  function setButtonsDisabled(instance, buttons, disabled) {
    	    const domCache = privateProps.domCache.get(instance);
    	    buttons.forEach(button => {
    	      domCache[button].disabled = disabled;
    	    });
    	  }

    	  /**
    	   * @param {HTMLInputElement} input
    	   * @param {boolean} disabled
    	   */
    	  function setInputDisabled(input, disabled) {
    	    if (!input) {
    	      return;
    	    }
    	    if (input.type === 'radio') {
    	      const radiosContainer = input.parentNode.parentNode;
    	      const radios = radiosContainer.querySelectorAll('input');
    	      for (let i = 0; i < radios.length; i++) {
    	        radios[i].disabled = disabled;
    	      }
    	    } else {
    	      input.disabled = disabled;
    	    }
    	  }
    	  function enableButtons() {
    	    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], false);
    	  }
    	  function disableButtons() {
    	    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], true);
    	  }
    	  function enableInput() {
    	    setInputDisabled(this.getInput(), false);
    	  }
    	  function disableInput() {
    	    setInputDisabled(this.getInput(), true);
    	  }

    	  /**
    	   * Show block with validation message
    	   *
    	   * @param {string} error
    	   */
    	  function showValidationMessage(error) {
    	    const domCache = privateProps.domCache.get(this);
    	    const params = privateProps.innerParams.get(this);
    	    setInnerHtml(domCache.validationMessage, error);
    	    domCache.validationMessage.className = swalClasses['validation-message'];
    	    if (params.customClass && params.customClass.validationMessage) {
    	      addClass(domCache.validationMessage, params.customClass.validationMessage);
    	    }
    	    show(domCache.validationMessage);
    	    const input = this.getInput();
    	    if (input) {
    	      input.setAttribute('aria-invalid', true);
    	      input.setAttribute('aria-describedby', swalClasses['validation-message']);
    	      focusInput(input);
    	      addClass(input, swalClasses.inputerror);
    	    }
    	  }

    	  /**
    	   * Hide block with validation message
    	   */
    	  function resetValidationMessage() {
    	    const domCache = privateProps.domCache.get(this);
    	    if (domCache.validationMessage) {
    	      hide(domCache.validationMessage);
    	    }
    	    const input = this.getInput();
    	    if (input) {
    	      input.removeAttribute('aria-invalid');
    	      input.removeAttribute('aria-describedby');
    	      removeClass(input, swalClasses.inputerror);
    	    }
    	  }

    	  const defaultParams = {
    	    title: '',
    	    titleText: '',
    	    text: '',
    	    html: '',
    	    footer: '',
    	    icon: undefined,
    	    iconColor: undefined,
    	    iconHtml: undefined,
    	    template: undefined,
    	    toast: false,
    	    showClass: {
    	      popup: 'swal2-show',
    	      backdrop: 'swal2-backdrop-show',
    	      icon: 'swal2-icon-show'
    	    },
    	    hideClass: {
    	      popup: 'swal2-hide',
    	      backdrop: 'swal2-backdrop-hide',
    	      icon: 'swal2-icon-hide'
    	    },
    	    customClass: {},
    	    target: 'body',
    	    color: undefined,
    	    backdrop: true,
    	    heightAuto: true,
    	    allowOutsideClick: true,
    	    allowEscapeKey: true,
    	    allowEnterKey: true,
    	    stopKeydownPropagation: true,
    	    keydownListenerCapture: false,
    	    showConfirmButton: true,
    	    showDenyButton: false,
    	    showCancelButton: false,
    	    preConfirm: undefined,
    	    preDeny: undefined,
    	    confirmButtonText: 'OK',
    	    confirmButtonAriaLabel: '',
    	    confirmButtonColor: undefined,
    	    denyButtonText: 'No',
    	    denyButtonAriaLabel: '',
    	    denyButtonColor: undefined,
    	    cancelButtonText: 'Cancel',
    	    cancelButtonAriaLabel: '',
    	    cancelButtonColor: undefined,
    	    buttonsStyling: true,
    	    reverseButtons: false,
    	    focusConfirm: true,
    	    focusDeny: false,
    	    focusCancel: false,
    	    returnFocus: true,
    	    showCloseButton: false,
    	    closeButtonHtml: '&times;',
    	    closeButtonAriaLabel: 'Close this dialog',
    	    loaderHtml: '',
    	    showLoaderOnConfirm: false,
    	    showLoaderOnDeny: false,
    	    imageUrl: undefined,
    	    imageWidth: undefined,
    	    imageHeight: undefined,
    	    imageAlt: '',
    	    timer: undefined,
    	    timerProgressBar: false,
    	    width: undefined,
    	    padding: undefined,
    	    background: undefined,
    	    input: undefined,
    	    inputPlaceholder: '',
    	    inputLabel: '',
    	    inputValue: '',
    	    inputOptions: {},
    	    inputAutoFocus: true,
    	    inputAutoTrim: true,
    	    inputAttributes: {},
    	    inputValidator: undefined,
    	    returnInputValueOnDeny: false,
    	    validationMessage: undefined,
    	    grow: false,
    	    position: 'center',
    	    progressSteps: [],
    	    currentProgressStep: undefined,
    	    progressStepsDistance: undefined,
    	    willOpen: undefined,
    	    didOpen: undefined,
    	    didRender: undefined,
    	    willClose: undefined,
    	    didClose: undefined,
    	    didDestroy: undefined,
    	    scrollbarPadding: true
    	  };
    	  const updatableParams = ['allowEscapeKey', 'allowOutsideClick', 'background', 'buttonsStyling', 'cancelButtonAriaLabel', 'cancelButtonColor', 'cancelButtonText', 'closeButtonAriaLabel', 'closeButtonHtml', 'color', 'confirmButtonAriaLabel', 'confirmButtonColor', 'confirmButtonText', 'currentProgressStep', 'customClass', 'denyButtonAriaLabel', 'denyButtonColor', 'denyButtonText', 'didClose', 'didDestroy', 'footer', 'hideClass', 'html', 'icon', 'iconColor', 'iconHtml', 'imageAlt', 'imageHeight', 'imageUrl', 'imageWidth', 'preConfirm', 'preDeny', 'progressSteps', 'returnFocus', 'reverseButtons', 'showCancelButton', 'showCloseButton', 'showConfirmButton', 'showDenyButton', 'text', 'title', 'titleText', 'willClose'];
    	  const deprecatedParams = {};
    	  const toastIncompatibleParams = ['allowOutsideClick', 'allowEnterKey', 'backdrop', 'focusConfirm', 'focusDeny', 'focusCancel', 'returnFocus', 'heightAuto', 'keydownListenerCapture'];

    	  /**
    	   * Is valid parameter
    	   *
    	   * @param {string} paramName
    	   * @returns {boolean}
    	   */
    	  const isValidParameter = paramName => {
    	    return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
    	  };

    	  /**
    	   * Is valid parameter for Swal.update() method
    	   *
    	   * @param {string} paramName
    	   * @returns {boolean}
    	   */
    	  const isUpdatableParameter = paramName => {
    	    return updatableParams.indexOf(paramName) !== -1;
    	  };

    	  /**
    	   * Is deprecated parameter
    	   *
    	   * @param {string} paramName
    	   * @returns {string | undefined}
    	   */
    	  const isDeprecatedParameter = paramName => {
    	    return deprecatedParams[paramName];
    	  };

    	  /**
    	   * @param {string} param
    	   */
    	  const checkIfParamIsValid = param => {
    	    if (!isValidParameter(param)) {
    	      warn(`Unknown parameter "${param}"`);
    	    }
    	  };

    	  /**
    	   * @param {string} param
    	   */
    	  const checkIfToastParamIsValid = param => {
    	    if (toastIncompatibleParams.includes(param)) {
    	      warn(`The parameter "${param}" is incompatible with toasts`);
    	    }
    	  };

    	  /**
    	   * @param {string} param
    	   */
    	  const checkIfParamIsDeprecated = param => {
    	    if (isDeprecatedParameter(param)) {
    	      warnAboutDeprecation(param, isDeprecatedParameter(param));
    	    }
    	  };

    	  /**
    	   * Show relevant warnings for given params
    	   *
    	   * @param {SweetAlertOptions} params
    	   */
    	  const showWarningsForParams = params => {
    	    if (params.backdrop === false && params.allowOutsideClick) {
    	      warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
    	    }
    	    for (const param in params) {
    	      checkIfParamIsValid(param);
    	      if (params.toast) {
    	        checkIfToastParamIsValid(param);
    	      }
    	      checkIfParamIsDeprecated(param);
    	    }
    	  };

    	  /**
    	   * Updates popup parameters.
    	   *
    	   * @param {SweetAlertOptions} params
    	   */
    	  function update(params) {
    	    const popup = getPopup();
    	    const innerParams = privateProps.innerParams.get(this);
    	    if (!popup || hasClass(popup, innerParams.hideClass.popup)) {
    	      warn(`You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.`);
    	      return;
    	    }
    	    const validUpdatableParams = filterValidParams(params);
    	    const updatedParams = Object.assign({}, innerParams, validUpdatableParams);
    	    render(this, updatedParams);
    	    privateProps.innerParams.set(this, updatedParams);
    	    Object.defineProperties(this, {
    	      params: {
    	        value: Object.assign({}, this.params, params),
    	        writable: false,
    	        enumerable: true
    	      }
    	    });
    	  }

    	  /**
    	   * @param {SweetAlertOptions} params
    	   * @returns {SweetAlertOptions}
    	   */
    	  const filterValidParams = params => {
    	    const validUpdatableParams = {};
    	    Object.keys(params).forEach(param => {
    	      if (isUpdatableParameter(param)) {
    	        validUpdatableParams[param] = params[param];
    	      } else {
    	        warn(`Invalid parameter to update: ${param}`);
    	      }
    	    });
    	    return validUpdatableParams;
    	  };

    	  /**
    	   * Dispose the current SweetAlert2 instance
    	   */
    	  function _destroy() {
    	    const domCache = privateProps.domCache.get(this);
    	    const innerParams = privateProps.innerParams.get(this);
    	    if (!innerParams) {
    	      disposeWeakMaps(this); // The WeakMaps might have been partly destroyed, we must recall it to dispose any remaining WeakMaps #2335
    	      return; // This instance has already been destroyed
    	    }

    	    // Check if there is another Swal closing
    	    if (domCache.popup && globalState.swalCloseEventFinishedCallback) {
    	      globalState.swalCloseEventFinishedCallback();
    	      delete globalState.swalCloseEventFinishedCallback;
    	    }
    	    if (typeof innerParams.didDestroy === 'function') {
    	      innerParams.didDestroy();
    	    }
    	    disposeSwal(this);
    	  }

    	  /**
    	   * @param {SweetAlert2} instance
    	   */
    	  const disposeSwal = instance => {
    	    disposeWeakMaps(instance);
    	    // Unset this.params so GC will dispose it (#1569)
    	    // @ts-ignore
    	    delete instance.params;
    	    // Unset globalState props so GC will dispose globalState (#1569)
    	    delete globalState.keydownHandler;
    	    delete globalState.keydownTarget;
    	    // Unset currentInstance
    	    delete globalState.currentInstance;
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   */
    	  const disposeWeakMaps = instance => {
    	    // If the current instance is awaiting a promise result, we keep the privateMethods to call them once the promise result is retrieved #2335
    	    // @ts-ignore
    	    if (instance.isAwaitingPromise()) {
    	      unsetWeakMaps(privateProps, instance);
    	      privateProps.awaitingPromise.set(instance, true);
    	    } else {
    	      unsetWeakMaps(privateMethods, instance);
    	      unsetWeakMaps(privateProps, instance);
    	    }
    	  };

    	  /**
    	   * @param {object} obj
    	   * @param {SweetAlert2} instance
    	   */
    	  const unsetWeakMaps = (obj, instance) => {
    	    for (const i in obj) {
    	      obj[i].delete(instance);
    	    }
    	  };

    	  var instanceMethods = /*#__PURE__*/Object.freeze({
    	    __proto__: null,
    	    _destroy: _destroy,
    	    close: close,
    	    closeModal: close,
    	    closePopup: close,
    	    closeToast: close,
    	    disableButtons: disableButtons,
    	    disableInput: disableInput,
    	    disableLoading: hideLoading,
    	    enableButtons: enableButtons,
    	    enableInput: enableInput,
    	    getInput: getInput,
    	    handleAwaitingPromise: handleAwaitingPromise,
    	    hideLoading: hideLoading,
    	    isAwaitingPromise: isAwaitingPromise,
    	    rejectPromise: rejectPromise,
    	    resetValidationMessage: resetValidationMessage,
    	    showValidationMessage: showValidationMessage,
    	    update: update
    	  });

    	  /**
    	   * Shows loader (spinner), this is useful with AJAX requests.
    	   * By default the loader be shown instead of the "Confirm" button.
    	   *
    	   * @param {HTMLButtonElement} [buttonToReplace]
    	   */
    	  const showLoading = buttonToReplace => {
    	    let popup = getPopup();
    	    if (!popup) {
    	      new Swal(); // eslint-disable-line no-new
    	    }

    	    popup = getPopup();
    	    const loader = getLoader();
    	    if (isToast()) {
    	      hide(getIcon());
    	    } else {
    	      replaceButton(popup, buttonToReplace);
    	    }
    	    show(loader);
    	    popup.setAttribute('data-loading', 'true');
    	    popup.setAttribute('aria-busy', 'true');
    	    popup.focus();
    	  };

    	  /**
    	   * @param {HTMLElement} popup
    	   * @param {HTMLButtonElement} [buttonToReplace]
    	   */
    	  const replaceButton = (popup, buttonToReplace) => {
    	    const actions = getActions();
    	    const loader = getLoader();
    	    if (!buttonToReplace && isVisible$1(getConfirmButton())) {
    	      buttonToReplace = getConfirmButton();
    	    }
    	    show(actions);
    	    if (buttonToReplace) {
    	      hide(buttonToReplace);
    	      loader.setAttribute('data-button-to-replace', buttonToReplace.className);
    	    }
    	    loader.parentNode.insertBefore(loader, buttonToReplace);
    	    addClass([popup, actions], swalClasses.loading);
    	  };

    	  /**
    	   * @typedef { string | number | boolean } InputValue
    	   */

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const handleInputOptionsAndValue = (instance, params) => {
    	    if (params.input === 'select' || params.input === 'radio') {
    	      handleInputOptions(instance, params);
    	    } else if (['text', 'email', 'number', 'tel', 'textarea'].includes(params.input) && (hasToPromiseFn(params.inputValue) || isPromise(params.inputValue))) {
    	      showLoading(getConfirmButton());
    	      handleInputValue(instance, params);
    	    }
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} innerParams
    	   * @returns {string | number | File | FileList | null}
    	   */
    	  const getInputValue = (instance, innerParams) => {
    	    const input = instance.getInput();
    	    if (!input) {
    	      return null;
    	    }
    	    switch (innerParams.input) {
    	      case 'checkbox':
    	        return getCheckboxValue(input);
    	      case 'radio':
    	        return getRadioValue(input);
    	      case 'file':
    	        return getFileValue(input);
    	      default:
    	        return innerParams.inputAutoTrim ? input.value.trim() : input.value;
    	    }
    	  };

    	  /**
    	   * @param {HTMLInputElement} input
    	   * @returns {number}
    	   */
    	  const getCheckboxValue = input => input.checked ? 1 : 0;

    	  /**
    	   * @param {HTMLInputElement} input
    	   * @returns {string | null}
    	   */
    	  const getRadioValue = input => input.checked ? input.value : null;

    	  /**
    	   * @param {HTMLInputElement} input
    	   * @returns {FileList | File | null}
    	   */
    	  const getFileValue = input => input.files.length ? input.getAttribute('multiple') !== null ? input.files : input.files[0] : null;

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const handleInputOptions = (instance, params) => {
    	    const popup = getPopup();
    	    /**
    	     * @param {Record<string, any>} inputOptions
    	     */
    	    const processInputOptions = inputOptions => {
    	      populateInputOptions[params.input](popup, formatInputOptions(inputOptions), params);
    	    };
    	    if (hasToPromiseFn(params.inputOptions) || isPromise(params.inputOptions)) {
    	      showLoading(getConfirmButton());
    	      asPromise(params.inputOptions).then(inputOptions => {
    	        instance.hideLoading();
    	        processInputOptions(inputOptions);
    	      });
    	    } else if (typeof params.inputOptions === 'object') {
    	      processInputOptions(params.inputOptions);
    	    } else {
    	      error(`Unexpected type of inputOptions! Expected object, Map or Promise, got ${typeof params.inputOptions}`);
    	    }
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {SweetAlertOptions} params
    	   */
    	  const handleInputValue = (instance, params) => {
    	    const input = instance.getInput();
    	    hide(input);
    	    asPromise(params.inputValue).then(inputValue => {
    	      input.value = params.input === 'number' ? `${parseFloat(inputValue) || 0}` : `${inputValue}`;
    	      show(input);
    	      input.focus();
    	      instance.hideLoading();
    	    }).catch(err => {
    	      error(`Error in inputValue promise: ${err}`);
    	      input.value = '';
    	      show(input);
    	      input.focus();
    	      instance.hideLoading();
    	    });
    	  };
    	  const populateInputOptions = {
    	    /**
    	     * @param {HTMLElement} popup
    	     * @param {Record<string, any>} inputOptions
    	     * @param {SweetAlertOptions} params
    	     */
    	    select: (popup, inputOptions, params) => {
    	      const select = getDirectChildByClass(popup, swalClasses.select);
    	      /**
    	       * @param {HTMLElement} parent
    	       * @param {string} optionLabel
    	       * @param {string} optionValue
    	       */
    	      const renderOption = (parent, optionLabel, optionValue) => {
    	        const option = document.createElement('option');
    	        option.value = optionValue;
    	        setInnerHtml(option, optionLabel);
    	        option.selected = isSelected(optionValue, params.inputValue);
    	        parent.appendChild(option);
    	      };
    	      inputOptions.forEach(inputOption => {
    	        const optionValue = inputOption[0];
    	        const optionLabel = inputOption[1];
    	        // <optgroup> spec:
    	        // https://www.w3.org/TR/html401/interact/forms.html#h-17.6
    	        // "...all OPTGROUP elements must be specified directly within a SELECT element (i.e., groups may not be nested)..."
    	        // check whether this is a <optgroup>
    	        if (Array.isArray(optionLabel)) {
    	          // if it is an array, then it is an <optgroup>
    	          const optgroup = document.createElement('optgroup');
    	          optgroup.label = optionValue;
    	          optgroup.disabled = false; // not configurable for now
    	          select.appendChild(optgroup);
    	          optionLabel.forEach(o => renderOption(optgroup, o[1], o[0]));
    	        } else {
    	          // case of <option>
    	          renderOption(select, optionLabel, optionValue);
    	        }
    	      });
    	      select.focus();
    	    },
    	    /**
    	     * @param {HTMLElement} popup
    	     * @param {Record<string, any>} inputOptions
    	     * @param {SweetAlertOptions} params
    	     */
    	    radio: (popup, inputOptions, params) => {
    	      const radio = getDirectChildByClass(popup, swalClasses.radio);
    	      inputOptions.forEach(inputOption => {
    	        const radioValue = inputOption[0];
    	        const radioLabel = inputOption[1];
    	        const radioInput = document.createElement('input');
    	        const radioLabelElement = document.createElement('label');
    	        radioInput.type = 'radio';
    	        radioInput.name = swalClasses.radio;
    	        radioInput.value = radioValue;
    	        if (isSelected(radioValue, params.inputValue)) {
    	          radioInput.checked = true;
    	        }
    	        const label = document.createElement('span');
    	        setInnerHtml(label, radioLabel);
    	        label.className = swalClasses.label;
    	        radioLabelElement.appendChild(radioInput);
    	        radioLabelElement.appendChild(label);
    	        radio.appendChild(radioLabelElement);
    	      });
    	      const radios = radio.querySelectorAll('input');
    	      if (radios.length) {
    	        radios[0].focus();
    	      }
    	    }
    	  };

    	  /**
    	   * Converts `inputOptions` into an array of `[value, label]`s
    	   *
    	   * @param {Record<string, any>} inputOptions
    	   * @returns {Array<Array<string>>}
    	   */
    	  const formatInputOptions = inputOptions => {
    	    const result = [];
    	    if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
    	      inputOptions.forEach((value, key) => {
    	        let valueFormatted = value;
    	        if (typeof valueFormatted === 'object') {
    	          // case of <optgroup>
    	          valueFormatted = formatInputOptions(valueFormatted);
    	        }
    	        result.push([key, valueFormatted]);
    	      });
    	    } else {
    	      Object.keys(inputOptions).forEach(key => {
    	        let valueFormatted = inputOptions[key];
    	        if (typeof valueFormatted === 'object') {
    	          // case of <optgroup>
    	          valueFormatted = formatInputOptions(valueFormatted);
    	        }
    	        result.push([key, valueFormatted]);
    	      });
    	    }
    	    return result;
    	  };

    	  /**
    	   * @param {string} optionValue
    	   * @param {InputValue | Promise<InputValue> | { toPromise: () => InputValue }} inputValue
    	   * @returns {boolean}
    	   */
    	  const isSelected = (optionValue, inputValue) => {
    	    return inputValue && inputValue.toString() === optionValue.toString();
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   */
    	  const handleConfirmButtonClick = instance => {
    	    const innerParams = privateProps.innerParams.get(instance);
    	    instance.disableButtons();
    	    if (innerParams.input) {
    	      handleConfirmOrDenyWithInput(instance, 'confirm');
    	    } else {
    	      confirm(instance, true);
    	    }
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   */
    	  const handleDenyButtonClick = instance => {
    	    const innerParams = privateProps.innerParams.get(instance);
    	    instance.disableButtons();
    	    if (innerParams.returnInputValueOnDeny) {
    	      handleConfirmOrDenyWithInput(instance, 'deny');
    	    } else {
    	      deny(instance, false);
    	    }
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {Function} dismissWith
    	   */
    	  const handleCancelButtonClick = (instance, dismissWith) => {
    	    instance.disableButtons();
    	    dismissWith(DismissReason.cancel);
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {'confirm' | 'deny'} type
    	   */
    	  const handleConfirmOrDenyWithInput = (instance, type) => {
    	    const innerParams = privateProps.innerParams.get(instance);
    	    if (!innerParams.input) {
    	      error(`The "input" parameter is needed to be set when using returnInputValueOn${capitalizeFirstLetter(type)}`);
    	      return;
    	    }
    	    const inputValue = getInputValue(instance, innerParams);
    	    if (innerParams.inputValidator) {
    	      handleInputValidator(instance, inputValue, type);
    	    } else if (!instance.getInput().checkValidity()) {
    	      instance.enableButtons();
    	      instance.showValidationMessage(innerParams.validationMessage);
    	    } else if (type === 'deny') {
    	      deny(instance, inputValue);
    	    } else {
    	      confirm(instance, inputValue);
    	    }
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {string | number | File | FileList | null} inputValue
    	   * @param {'confirm' | 'deny'} type
    	   */
    	  const handleInputValidator = (instance, inputValue, type) => {
    	    const innerParams = privateProps.innerParams.get(instance);
    	    instance.disableInput();
    	    const validationPromise = Promise.resolve().then(() => asPromise(innerParams.inputValidator(inputValue, innerParams.validationMessage)));
    	    validationPromise.then(validationMessage => {
    	      instance.enableButtons();
    	      instance.enableInput();
    	      if (validationMessage) {
    	        instance.showValidationMessage(validationMessage);
    	      } else if (type === 'deny') {
    	        deny(instance, inputValue);
    	      } else {
    	        confirm(instance, inputValue);
    	      }
    	    });
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {any} value
    	   */
    	  const deny = (instance, value) => {
    	    const innerParams = privateProps.innerParams.get(instance || undefined);
    	    if (innerParams.showLoaderOnDeny) {
    	      showLoading(getDenyButton());
    	    }
    	    if (innerParams.preDeny) {
    	      privateProps.awaitingPromise.set(instance || undefined, true); // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preDeny's promise is received
    	      const preDenyPromise = Promise.resolve().then(() => asPromise(innerParams.preDeny(value, innerParams.validationMessage)));
    	      preDenyPromise.then(preDenyValue => {
    	        if (preDenyValue === false) {
    	          instance.hideLoading();
    	          handleAwaitingPromise(instance);
    	        } else {
    	          instance.close({
    	            isDenied: true,
    	            value: typeof preDenyValue === 'undefined' ? value : preDenyValue
    	          });
    	        }
    	      }).catch(error => rejectWith(instance || undefined, error));
    	    } else {
    	      instance.close({
    	        isDenied: true,
    	        value
    	      });
    	    }
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {any} value
    	   */
    	  const succeedWith = (instance, value) => {
    	    instance.close({
    	      isConfirmed: true,
    	      value
    	    });
    	  };

    	  /**
    	   *
    	   * @param {SweetAlert2} instance
    	   * @param {string} error
    	   */
    	  const rejectWith = (instance, error) => {
    	    // @ts-ignore
    	    instance.rejectPromise(error);
    	  };

    	  /**
    	   *
    	   * @param {SweetAlert2} instance
    	   * @param {any} value
    	   */
    	  const confirm = (instance, value) => {
    	    const innerParams = privateProps.innerParams.get(instance || undefined);
    	    if (innerParams.showLoaderOnConfirm) {
    	      showLoading();
    	    }
    	    if (innerParams.preConfirm) {
    	      instance.resetValidationMessage();
    	      privateProps.awaitingPromise.set(instance || undefined, true); // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preConfirm's promise is received
    	      const preConfirmPromise = Promise.resolve().then(() => asPromise(innerParams.preConfirm(value, innerParams.validationMessage)));
    	      preConfirmPromise.then(preConfirmValue => {
    	        if (isVisible$1(getValidationMessage()) || preConfirmValue === false) {
    	          instance.hideLoading();
    	          handleAwaitingPromise(instance);
    	        } else {
    	          succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
    	        }
    	      }).catch(error => rejectWith(instance || undefined, error));
    	    } else {
    	      succeedWith(instance, value);
    	    }
    	  };

    	  const handlePopupClick = (instance, domCache, dismissWith) => {
    	    const innerParams = privateProps.innerParams.get(instance);
    	    if (innerParams.toast) {
    	      handleToastClick(instance, domCache, dismissWith);
    	    } else {
    	      // Ignore click events that had mousedown on the popup but mouseup on the container
    	      // This can happen when the user drags a slider
    	      handleModalMousedown(domCache);

    	      // Ignore click events that had mousedown on the container but mouseup on the popup
    	      handleContainerMousedown(domCache);
    	      handleModalClick(instance, domCache, dismissWith);
    	    }
    	  };
    	  const handleToastClick = (instance, domCache, dismissWith) => {
    	    // Closing toast by internal click
    	    domCache.popup.onclick = () => {
    	      const innerParams = privateProps.innerParams.get(instance);
    	      if (innerParams && (isAnyButtonShown(innerParams) || innerParams.timer || innerParams.input)) {
    	        return;
    	      }
    	      dismissWith(DismissReason.close);
    	    };
    	  };

    	  /**
    	   * @param {*} innerParams
    	   * @returns {boolean}
    	   */
    	  const isAnyButtonShown = innerParams => {
    	    return innerParams.showConfirmButton || innerParams.showDenyButton || innerParams.showCancelButton || innerParams.showCloseButton;
    	  };
    	  let ignoreOutsideClick = false;
    	  const handleModalMousedown = domCache => {
    	    domCache.popup.onmousedown = () => {
    	      domCache.container.onmouseup = function (e) {
    	        domCache.container.onmouseup = undefined;
    	        // We only check if the mouseup target is the container because usually it doesn't
    	        // have any other direct children aside of the popup
    	        if (e.target === domCache.container) {
    	          ignoreOutsideClick = true;
    	        }
    	      };
    	    };
    	  };
    	  const handleContainerMousedown = domCache => {
    	    domCache.container.onmousedown = () => {
    	      domCache.popup.onmouseup = function (e) {
    	        domCache.popup.onmouseup = undefined;
    	        // We also need to check if the mouseup target is a child of the popup
    	        if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
    	          ignoreOutsideClick = true;
    	        }
    	      };
    	    };
    	  };
    	  const handleModalClick = (instance, domCache, dismissWith) => {
    	    domCache.container.onclick = e => {
    	      const innerParams = privateProps.innerParams.get(instance);
    	      if (ignoreOutsideClick) {
    	        ignoreOutsideClick = false;
    	        return;
    	      }
    	      if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
    	        dismissWith(DismissReason.backdrop);
    	      }
    	    };
    	  };

    	  const isJqueryElement = elem => typeof elem === 'object' && elem.jquery;
    	  const isElement = elem => elem instanceof Element || isJqueryElement(elem);
    	  const argsToParams = args => {
    	    const params = {};
    	    if (typeof args[0] === 'object' && !isElement(args[0])) {
    	      Object.assign(params, args[0]);
    	    } else {
    	      ['title', 'html', 'icon'].forEach((name, index) => {
    	        const arg = args[index];
    	        if (typeof arg === 'string' || isElement(arg)) {
    	          params[name] = arg;
    	        } else if (arg !== undefined) {
    	          error(`Unexpected type of ${name}! Expected "string" or "Element", got ${typeof arg}`);
    	        }
    	      });
    	    }
    	    return params;
    	  };

    	  /**
    	   * Main method to create a new SweetAlert2 popup
    	   *
    	   * @param  {...SweetAlertOptions} args
    	   * @returns {Promise<SweetAlertResult>}
    	   */
    	  function fire() {
    	    const Swal = this; // eslint-disable-line @typescript-eslint/no-this-alias
    	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    	      args[_key] = arguments[_key];
    	    }
    	    return new Swal(...args);
    	  }

    	  /**
    	   * Returns an extended version of `Swal` containing `params` as defaults.
    	   * Useful for reusing Swal configuration.
    	   *
    	   * For example:
    	   *
    	   * Before:
    	   * const textPromptOptions = { input: 'text', showCancelButton: true }
    	   * const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
    	   * const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
    	   *
    	   * After:
    	   * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
    	   * const {value: firstName} = await TextPrompt('What is your first name?')
    	   * const {value: lastName} = await TextPrompt('What is your last name?')
    	   *
    	   * @param mixinParams
    	   */
    	  function mixin(mixinParams) {
    	    class MixinSwal extends this {
    	      _main(params, priorityMixinParams) {
    	        return super._main(params, Object.assign({}, mixinParams, priorityMixinParams));
    	      }
    	    }
    	    return MixinSwal;
    	  }

    	  /**
    	   * If `timer` parameter is set, returns number of milliseconds of timer remained.
    	   * Otherwise, returns undefined.
    	   *
    	   * @returns {number | undefined}
    	   */
    	  const getTimerLeft = () => {
    	    return globalState.timeout && globalState.timeout.getTimerLeft();
    	  };

    	  /**
    	   * Stop timer. Returns number of milliseconds of timer remained.
    	   * If `timer` parameter isn't set, returns undefined.
    	   *
    	   * @returns {number | undefined}
    	   */
    	  const stopTimer = () => {
    	    if (globalState.timeout) {
    	      stopTimerProgressBar();
    	      return globalState.timeout.stop();
    	    }
    	  };

    	  /**
    	   * Resume timer. Returns number of milliseconds of timer remained.
    	   * If `timer` parameter isn't set, returns undefined.
    	   *
    	   * @returns {number | undefined}
    	   */
    	  const resumeTimer = () => {
    	    if (globalState.timeout) {
    	      const remaining = globalState.timeout.start();
    	      animateTimerProgressBar(remaining);
    	      return remaining;
    	    }
    	  };

    	  /**
    	   * Resume timer. Returns number of milliseconds of timer remained.
    	   * If `timer` parameter isn't set, returns undefined.
    	   *
    	   * @returns {number | undefined}
    	   */
    	  const toggleTimer = () => {
    	    const timer = globalState.timeout;
    	    return timer && (timer.running ? stopTimer() : resumeTimer());
    	  };

    	  /**
    	   * Increase timer. Returns number of milliseconds of an updated timer.
    	   * If `timer` parameter isn't set, returns undefined.
    	   *
    	   * @param {number} n
    	   * @returns {number | undefined}
    	   */
    	  const increaseTimer = n => {
    	    if (globalState.timeout) {
    	      const remaining = globalState.timeout.increase(n);
    	      animateTimerProgressBar(remaining, true);
    	      return remaining;
    	    }
    	  };

    	  /**
    	   * Check if timer is running. Returns true if timer is running
    	   * or false if timer is paused or stopped.
    	   * If `timer` parameter isn't set, returns undefined
    	   *
    	   * @returns {boolean}
    	   */
    	  const isTimerRunning = () => {
    	    return globalState.timeout && globalState.timeout.isRunning();
    	  };

    	  let bodyClickListenerAdded = false;
    	  const clickHandlers = {};

    	  /**
    	   * @param {string} attr
    	   */
    	  function bindClickHandler() {
    	    let attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'data-swal-template';
    	    clickHandlers[attr] = this;
    	    if (!bodyClickListenerAdded) {
    	      document.body.addEventListener('click', bodyClickListener);
    	      bodyClickListenerAdded = true;
    	    }
    	  }
    	  const bodyClickListener = event => {
    	    for (let el = event.target; el && el !== document; el = el.parentNode) {
    	      for (const attr in clickHandlers) {
    	        const template = el.getAttribute(attr);
    	        if (template) {
    	          clickHandlers[attr].fire({
    	            template
    	          });
    	          return;
    	        }
    	      }
    	    }
    	  };

    	  var staticMethods = /*#__PURE__*/Object.freeze({
    	    __proto__: null,
    	    argsToParams: argsToParams,
    	    bindClickHandler: bindClickHandler,
    	    clickCancel: clickCancel,
    	    clickConfirm: clickConfirm,
    	    clickDeny: clickDeny,
    	    enableLoading: showLoading,
    	    fire: fire,
    	    getActions: getActions,
    	    getCancelButton: getCancelButton,
    	    getCloseButton: getCloseButton,
    	    getConfirmButton: getConfirmButton,
    	    getContainer: getContainer,
    	    getDenyButton: getDenyButton,
    	    getFocusableElements: getFocusableElements,
    	    getFooter: getFooter,
    	    getHtmlContainer: getHtmlContainer,
    	    getIcon: getIcon,
    	    getIconContent: getIconContent,
    	    getImage: getImage,
    	    getInputLabel: getInputLabel,
    	    getLoader: getLoader,
    	    getPopup: getPopup,
    	    getProgressSteps: getProgressSteps,
    	    getTimerLeft: getTimerLeft,
    	    getTimerProgressBar: getTimerProgressBar,
    	    getTitle: getTitle,
    	    getValidationMessage: getValidationMessage,
    	    increaseTimer: increaseTimer,
    	    isDeprecatedParameter: isDeprecatedParameter,
    	    isLoading: isLoading,
    	    isTimerRunning: isTimerRunning,
    	    isUpdatableParameter: isUpdatableParameter,
    	    isValidParameter: isValidParameter,
    	    isVisible: isVisible,
    	    mixin: mixin,
    	    resumeTimer: resumeTimer,
    	    showLoading: showLoading,
    	    stopTimer: stopTimer,
    	    toggleTimer: toggleTimer
    	  });

    	  class Timer {
    	    /**
    	     * @param {Function} callback
    	     * @param {number} delay
    	     */
    	    constructor(callback, delay) {
    	      this.callback = callback;
    	      this.remaining = delay;
    	      this.running = false;
    	      this.start();
    	    }
    	    start() {
    	      if (!this.running) {
    	        this.running = true;
    	        this.started = new Date();
    	        this.id = setTimeout(this.callback, this.remaining);
    	      }
    	      return this.remaining;
    	    }
    	    stop() {
    	      if (this.running) {
    	        this.running = false;
    	        clearTimeout(this.id);
    	        this.remaining -= new Date().getTime() - this.started.getTime();
    	      }
    	      return this.remaining;
    	    }
    	    increase(n) {
    	      const running = this.running;
    	      if (running) {
    	        this.stop();
    	      }
    	      this.remaining += n;
    	      if (running) {
    	        this.start();
    	      }
    	      return this.remaining;
    	    }
    	    getTimerLeft() {
    	      if (this.running) {
    	        this.stop();
    	        this.start();
    	      }
    	      return this.remaining;
    	    }
    	    isRunning() {
    	      return this.running;
    	    }
    	  }

    	  const swalStringParams = ['swal-title', 'swal-html', 'swal-footer'];

    	  /**
    	   * @param {SweetAlertOptions} params
    	   * @returns {SweetAlertOptions}
    	   */
    	  const getTemplateParams = params => {
    	    /** @type {HTMLTemplateElement} */
    	    const template = typeof params.template === 'string' ? document.querySelector(params.template) : params.template;
    	    if (!template) {
    	      return {};
    	    }
    	    /** @type {DocumentFragment} */
    	    const templateContent = template.content;
    	    showWarningsForElements(templateContent);
    	    const result = Object.assign(getSwalParams(templateContent), getSwalFunctionParams(templateContent), getSwalButtons(templateContent), getSwalImage(templateContent), getSwalIcon(templateContent), getSwalInput(templateContent), getSwalStringParams(templateContent, swalStringParams));
    	    return result;
    	  };

    	  /**
    	   * @param {DocumentFragment} templateContent
    	   * @returns {SweetAlertOptions}
    	   */
    	  const getSwalParams = templateContent => {
    	    const result = {};
    	    /** @type {HTMLElement[]} */
    	    const swalParams = Array.from(templateContent.querySelectorAll('swal-param'));
    	    swalParams.forEach(param => {
    	      showWarningsForAttributes(param, ['name', 'value']);
    	      const paramName = param.getAttribute('name');
    	      const value = param.getAttribute('value');
    	      if (typeof defaultParams[paramName] === 'boolean') {
    	        result[paramName] = value !== 'false';
    	      } else if (typeof defaultParams[paramName] === 'object') {
    	        result[paramName] = JSON.parse(value);
    	      } else {
    	        result[paramName] = value;
    	      }
    	    });
    	    return result;
    	  };

    	  /**
    	   * @param {DocumentFragment} templateContent
    	   * @returns {SweetAlertOptions}
    	   */
    	  const getSwalFunctionParams = templateContent => {
    	    const result = {};
    	    /** @type {HTMLElement[]} */
    	    const swalFunctions = Array.from(templateContent.querySelectorAll('swal-function-param'));
    	    swalFunctions.forEach(param => {
    	      const paramName = param.getAttribute('name');
    	      const value = param.getAttribute('value');
    	      result[paramName] = new Function(`return ${value}`)();
    	    });
    	    return result;
    	  };

    	  /**
    	   * @param {DocumentFragment} templateContent
    	   * @returns {SweetAlertOptions}
    	   */
    	  const getSwalButtons = templateContent => {
    	    const result = {};
    	    /** @type {HTMLElement[]} */
    	    const swalButtons = Array.from(templateContent.querySelectorAll('swal-button'));
    	    swalButtons.forEach(button => {
    	      showWarningsForAttributes(button, ['type', 'color', 'aria-label']);
    	      const type = button.getAttribute('type');
    	      result[`${type}ButtonText`] = button.innerHTML;
    	      result[`show${capitalizeFirstLetter(type)}Button`] = true;
    	      if (button.hasAttribute('color')) {
    	        result[`${type}ButtonColor`] = button.getAttribute('color');
    	      }
    	      if (button.hasAttribute('aria-label')) {
    	        result[`${type}ButtonAriaLabel`] = button.getAttribute('aria-label');
    	      }
    	    });
    	    return result;
    	  };

    	  /**
    	   * @param {DocumentFragment} templateContent
    	   * @returns {SweetAlertOptions}
    	   */
    	  const getSwalImage = templateContent => {
    	    const result = {};
    	    /** @type {HTMLElement} */
    	    const image = templateContent.querySelector('swal-image');
    	    if (image) {
    	      showWarningsForAttributes(image, ['src', 'width', 'height', 'alt']);
    	      if (image.hasAttribute('src')) {
    	        result.imageUrl = image.getAttribute('src');
    	      }
    	      if (image.hasAttribute('width')) {
    	        result.imageWidth = image.getAttribute('width');
    	      }
    	      if (image.hasAttribute('height')) {
    	        result.imageHeight = image.getAttribute('height');
    	      }
    	      if (image.hasAttribute('alt')) {
    	        result.imageAlt = image.getAttribute('alt');
    	      }
    	    }
    	    return result;
    	  };

    	  /**
    	   * @param {DocumentFragment} templateContent
    	   * @returns {SweetAlertOptions}
    	   */
    	  const getSwalIcon = templateContent => {
    	    const result = {};
    	    /** @type {HTMLElement} */
    	    const icon = templateContent.querySelector('swal-icon');
    	    if (icon) {
    	      showWarningsForAttributes(icon, ['type', 'color']);
    	      if (icon.hasAttribute('type')) {
    	        /** @type {SweetAlertIcon} */
    	        // @ts-ignore
    	        result.icon = icon.getAttribute('type');
    	      }
    	      if (icon.hasAttribute('color')) {
    	        result.iconColor = icon.getAttribute('color');
    	      }
    	      result.iconHtml = icon.innerHTML;
    	    }
    	    return result;
    	  };

    	  /**
    	   * @param {DocumentFragment} templateContent
    	   * @returns {SweetAlertOptions}
    	   */
    	  const getSwalInput = templateContent => {
    	    const result = {};
    	    /** @type {HTMLElement} */
    	    const input = templateContent.querySelector('swal-input');
    	    if (input) {
    	      showWarningsForAttributes(input, ['type', 'label', 'placeholder', 'value']);
    	      /** @type {SweetAlertInput} */
    	      // @ts-ignore
    	      result.input = input.getAttribute('type') || 'text';
    	      if (input.hasAttribute('label')) {
    	        result.inputLabel = input.getAttribute('label');
    	      }
    	      if (input.hasAttribute('placeholder')) {
    	        result.inputPlaceholder = input.getAttribute('placeholder');
    	      }
    	      if (input.hasAttribute('value')) {
    	        result.inputValue = input.getAttribute('value');
    	      }
    	    }
    	    /** @type {HTMLElement[]} */
    	    const inputOptions = Array.from(templateContent.querySelectorAll('swal-input-option'));
    	    if (inputOptions.length) {
    	      result.inputOptions = {};
    	      inputOptions.forEach(option => {
    	        showWarningsForAttributes(option, ['value']);
    	        const optionValue = option.getAttribute('value');
    	        const optionName = option.innerHTML;
    	        result.inputOptions[optionValue] = optionName;
    	      });
    	    }
    	    return result;
    	  };

    	  /**
    	   * @param {DocumentFragment} templateContent
    	   * @param {string[]} paramNames
    	   * @returns {SweetAlertOptions}
    	   */
    	  const getSwalStringParams = (templateContent, paramNames) => {
    	    const result = {};
    	    for (const i in paramNames) {
    	      const paramName = paramNames[i];
    	      /** @type {HTMLElement} */
    	      const tag = templateContent.querySelector(paramName);
    	      if (tag) {
    	        showWarningsForAttributes(tag, []);
    	        result[paramName.replace(/^swal-/, '')] = tag.innerHTML.trim();
    	      }
    	    }
    	    return result;
    	  };

    	  /**
    	   * @param {DocumentFragment} templateContent
    	   */
    	  const showWarningsForElements = templateContent => {
    	    const allowedElements = swalStringParams.concat(['swal-param', 'swal-function-param', 'swal-button', 'swal-image', 'swal-icon', 'swal-input', 'swal-input-option']);
    	    Array.from(templateContent.children).forEach(el => {
    	      const tagName = el.tagName.toLowerCase();
    	      if (!allowedElements.includes(tagName)) {
    	        warn(`Unrecognized element <${tagName}>`);
    	      }
    	    });
    	  };

    	  /**
    	   * @param {HTMLElement} el
    	   * @param {string[]} allowedAttributes
    	   */
    	  const showWarningsForAttributes = (el, allowedAttributes) => {
    	    Array.from(el.attributes).forEach(attribute => {
    	      if (allowedAttributes.indexOf(attribute.name) === -1) {
    	        warn([`Unrecognized attribute "${attribute.name}" on <${el.tagName.toLowerCase()}>.`, `${allowedAttributes.length ? `Allowed attributes are: ${allowedAttributes.join(', ')}` : 'To set the value, use HTML within the element.'}`]);
    	      }
    	    });
    	  };

    	  const SHOW_CLASS_TIMEOUT = 10;

    	  /**
    	   * Open popup, add necessary classes and styles, fix scrollbar
    	   *
    	   * @param {SweetAlertOptions} params
    	   */
    	  const openPopup = params => {
    	    const container = getContainer();
    	    const popup = getPopup();
    	    if (typeof params.willOpen === 'function') {
    	      params.willOpen(popup);
    	    }
    	    const bodyStyles = window.getComputedStyle(document.body);
    	    const initialBodyOverflow = bodyStyles.overflowY;
    	    addClasses(container, popup, params);

    	    // scrolling is 'hidden' until animation is done, after that 'auto'
    	    setTimeout(() => {
    	      setScrollingVisibility(container, popup);
    	    }, SHOW_CLASS_TIMEOUT);
    	    if (isModal()) {
    	      fixScrollContainer(container, params.scrollbarPadding, initialBodyOverflow);
    	      setAriaHidden();
    	    }
    	    if (!isToast() && !globalState.previousActiveElement) {
    	      globalState.previousActiveElement = document.activeElement;
    	    }
    	    if (typeof params.didOpen === 'function') {
    	      setTimeout(() => params.didOpen(popup));
    	    }
    	    removeClass(container, swalClasses['no-transition']);
    	  };

    	  /**
    	   * @param {AnimationEvent} event
    	   */
    	  const swalOpenAnimationFinished = event => {
    	    const popup = getPopup();
    	    if (event.target !== popup) {
    	      return;
    	    }
    	    const container = getContainer();
    	    popup.removeEventListener(animationEndEvent, swalOpenAnimationFinished);
    	    container.style.overflowY = 'auto';
    	  };

    	  /**
    	   * @param {HTMLElement} container
    	   * @param {HTMLElement} popup
    	   */
    	  const setScrollingVisibility = (container, popup) => {
    	    if (animationEndEvent && hasCssAnimation(popup)) {
    	      container.style.overflowY = 'hidden';
    	      popup.addEventListener(animationEndEvent, swalOpenAnimationFinished);
    	    } else {
    	      container.style.overflowY = 'auto';
    	    }
    	  };

    	  /**
    	   * @param {HTMLElement} container
    	   * @param {boolean} scrollbarPadding
    	   * @param {string} initialBodyOverflow
    	   */
    	  const fixScrollContainer = (container, scrollbarPadding, initialBodyOverflow) => {
    	    iOSfix();
    	    if (scrollbarPadding && initialBodyOverflow !== 'hidden') {
    	      fixScrollbar();
    	    }

    	    // sweetalert2/issues/1247
    	    setTimeout(() => {
    	      container.scrollTop = 0;
    	    });
    	  };

    	  /**
    	   * @param {HTMLElement} container
    	   * @param {HTMLElement} popup
    	   * @param {SweetAlertOptions} params
    	   */
    	  const addClasses = (container, popup, params) => {
    	    addClass(container, params.showClass.backdrop);
    	    // this workaround with opacity is needed for https://github.com/sweetalert2/sweetalert2/issues/2059
    	    popup.style.setProperty('opacity', '0', 'important');
    	    show(popup, 'grid');
    	    setTimeout(() => {
    	      // Animate popup right after showing it
    	      addClass(popup, params.showClass.popup);
    	      // and remove the opacity workaround
    	      popup.style.removeProperty('opacity');
    	    }, SHOW_CLASS_TIMEOUT); // 10ms in order to fix #2062

    	    addClass([document.documentElement, document.body], swalClasses.shown);
    	    if (params.heightAuto && params.backdrop && !params.toast) {
    	      addClass([document.documentElement, document.body], swalClasses['height-auto']);
    	    }
    	  };

    	  var defaultInputValidators = {
    	    /**
    	     * @param {string} string
    	     * @param {string} validationMessage
    	     * @returns {Promise<void | string>}
    	     */
    	    email: (string, validationMessage) => {
    	      return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid email address');
    	    },
    	    /**
    	     * @param {string} string
    	     * @param {string} validationMessage
    	     * @returns {Promise<void | string>}
    	     */
    	    url: (string, validationMessage) => {
    	      // taken from https://stackoverflow.com/a/3809435 with a small change from #1306 and #2013
    	      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid URL');
    	    }
    	  };

    	  /**
    	   * @param {SweetAlertOptions} params
    	   */
    	  function setDefaultInputValidators(params) {
    	    // Use default `inputValidator` for supported input types if not provided
    	    if (!params.inputValidator) {
    	      Object.keys(defaultInputValidators).forEach(key => {
    	        if (params.input === key) {
    	          params.inputValidator = defaultInputValidators[key];
    	        }
    	      });
    	    }
    	  }

    	  /**
    	   * @param {SweetAlertOptions} params
    	   */
    	  function validateCustomTargetElement(params) {
    	    // Determine if the custom target element is valid
    	    if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
    	      warn('Target parameter is not valid, defaulting to "body"');
    	      params.target = 'body';
    	    }
    	  }

    	  /**
    	   * Set type, text and actions on popup
    	   *
    	   * @param {SweetAlertOptions} params
    	   */
    	  function setParameters(params) {
    	    setDefaultInputValidators(params);

    	    // showLoaderOnConfirm && preConfirm
    	    if (params.showLoaderOnConfirm && !params.preConfirm) {
    	      warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
    	    }
    	    validateCustomTargetElement(params);

    	    // Replace newlines with <br> in title
    	    if (typeof params.title === 'string') {
    	      params.title = params.title.split('\n').join('<br />');
    	    }
    	    init(params);
    	  }

    	  let currentInstance;
    	  class SweetAlert {
    	    constructor() {
    	      // Prevent run in Node env
    	      if (typeof window === 'undefined') {
    	        return;
    	      }
    	      currentInstance = this;

    	      // @ts-ignore
    	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    	        args[_key] = arguments[_key];
    	      }
    	      const outerParams = Object.freeze(this.constructor.argsToParams(args));
    	      Object.defineProperties(this, {
    	        params: {
    	          value: outerParams,
    	          writable: false,
    	          enumerable: true,
    	          configurable: true
    	        }
    	      });

    	      // @ts-ignore
    	      const promise = currentInstance._main(currentInstance.params);
    	      privateProps.promise.set(this, promise);
    	    }
    	    _main(userParams) {
    	      let mixinParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    	      showWarningsForParams(Object.assign({}, mixinParams, userParams));
    	      if (globalState.currentInstance) {
    	        // @ts-ignore
    	        globalState.currentInstance._destroy();
    	        if (isModal()) {
    	          unsetAriaHidden();
    	        }
    	      }
    	      globalState.currentInstance = currentInstance;
    	      const innerParams = prepareParams(userParams, mixinParams);
    	      setParameters(innerParams);
    	      Object.freeze(innerParams);

    	      // clear the previous timer
    	      if (globalState.timeout) {
    	        globalState.timeout.stop();
    	        delete globalState.timeout;
    	      }

    	      // clear the restore focus timeout
    	      clearTimeout(globalState.restoreFocusTimeout);
    	      const domCache = populateDomCache(currentInstance);
    	      render(currentInstance, innerParams);
    	      privateProps.innerParams.set(currentInstance, innerParams);
    	      return swalPromise(currentInstance, domCache, innerParams);
    	    }

    	    // `catch` cannot be the name of a module export, so we define our thenable methods here instead
    	    then(onFulfilled) {
    	      const promise = privateProps.promise.get(this);
    	      return promise.then(onFulfilled);
    	    }
    	    finally(onFinally) {
    	      const promise = privateProps.promise.get(this);
    	      return promise.finally(onFinally);
    	    }
    	  }

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @param {DomCache} domCache
    	   * @param {SweetAlertOptions} innerParams
    	   * @returns {Promise}
    	   */
    	  const swalPromise = (instance, domCache, innerParams) => {
    	    return new Promise((resolve, reject) => {
    	      // functions to handle all closings/dismissals
    	      /**
    	       * @param {DismissReason} dismiss
    	       */
    	      const dismissWith = dismiss => {
    	        // @ts-ignore
    	        instance.close({
    	          isDismissed: true,
    	          dismiss
    	        });
    	      };
    	      privateMethods.swalPromiseResolve.set(instance, resolve);
    	      privateMethods.swalPromiseReject.set(instance, reject);
    	      domCache.confirmButton.onclick = () => {
    	        handleConfirmButtonClick(instance);
    	      };
    	      domCache.denyButton.onclick = () => {
    	        handleDenyButtonClick(instance);
    	      };
    	      domCache.cancelButton.onclick = () => {
    	        handleCancelButtonClick(instance, dismissWith);
    	      };
    	      domCache.closeButton.onclick = () => {
    	        // @ts-ignore
    	        dismissWith(DismissReason.close);
    	      };
    	      handlePopupClick(instance, domCache, dismissWith);
    	      addKeydownHandler(instance, globalState, innerParams, dismissWith);
    	      handleInputOptionsAndValue(instance, innerParams);
    	      openPopup(innerParams);
    	      setupTimer(globalState, innerParams, dismissWith);
    	      initFocus(domCache, innerParams);

    	      // Scroll container to top on open (#1247, #1946)
    	      setTimeout(() => {
    	        domCache.container.scrollTop = 0;
    	      });
    	    });
    	  };

    	  /**
    	   * @param {SweetAlertOptions} userParams
    	   * @param {SweetAlertOptions} mixinParams
    	   * @returns {SweetAlertOptions}
    	   */
    	  const prepareParams = (userParams, mixinParams) => {
    	    const templateParams = getTemplateParams(userParams);
    	    const params = Object.assign({}, defaultParams, mixinParams, templateParams, userParams); // precedence is described in #2131
    	    params.showClass = Object.assign({}, defaultParams.showClass, params.showClass);
    	    params.hideClass = Object.assign({}, defaultParams.hideClass, params.hideClass);
    	    return params;
    	  };

    	  /**
    	   * @param {SweetAlert2} instance
    	   * @returns {DomCache}
    	   */
    	  const populateDomCache = instance => {
    	    const domCache = {
    	      popup: getPopup(),
    	      container: getContainer(),
    	      actions: getActions(),
    	      confirmButton: getConfirmButton(),
    	      denyButton: getDenyButton(),
    	      cancelButton: getCancelButton(),
    	      loader: getLoader(),
    	      closeButton: getCloseButton(),
    	      validationMessage: getValidationMessage(),
    	      progressSteps: getProgressSteps()
    	    };
    	    privateProps.domCache.set(instance, domCache);
    	    return domCache;
    	  };

    	  /**
    	   * @param {GlobalState} globalState
    	   * @param {SweetAlertOptions} innerParams
    	   * @param {Function} dismissWith
    	   */
    	  const setupTimer = (globalState, innerParams, dismissWith) => {
    	    const timerProgressBar = getTimerProgressBar();
    	    hide(timerProgressBar);
    	    if (innerParams.timer) {
    	      globalState.timeout = new Timer(() => {
    	        dismissWith('timer');
    	        delete globalState.timeout;
    	      }, innerParams.timer);
    	      if (innerParams.timerProgressBar) {
    	        show(timerProgressBar);
    	        applyCustomClass(timerProgressBar, innerParams, 'timerProgressBar');
    	        setTimeout(() => {
    	          if (globalState.timeout && globalState.timeout.running) {
    	            // timer can be already stopped or unset at this point
    	            animateTimerProgressBar(innerParams.timer);
    	          }
    	        });
    	      }
    	    }
    	  };

    	  /**
    	   * @param {DomCache} domCache
    	   * @param {SweetAlertOptions} innerParams
    	   */
    	  const initFocus = (domCache, innerParams) => {
    	    if (innerParams.toast) {
    	      return;
    	    }
    	    if (!callIfFunction(innerParams.allowEnterKey)) {
    	      blurActiveElement();
    	      return;
    	    }
    	    if (!focusButton(domCache, innerParams)) {
    	      setFocus(-1, 1);
    	    }
    	  };

    	  /**
    	   * @param {DomCache} domCache
    	   * @param {SweetAlertOptions} innerParams
    	   * @returns {boolean}
    	   */
    	  const focusButton = (domCache, innerParams) => {
    	    if (innerParams.focusDeny && isVisible$1(domCache.denyButton)) {
    	      domCache.denyButton.focus();
    	      return true;
    	    }
    	    if (innerParams.focusCancel && isVisible$1(domCache.cancelButton)) {
    	      domCache.cancelButton.focus();
    	      return true;
    	    }
    	    if (innerParams.focusConfirm && isVisible$1(domCache.confirmButton)) {
    	      domCache.confirmButton.focus();
    	      return true;
    	    }
    	    return false;
    	  };
    	  const blurActiveElement = () => {
    	    if (document.activeElement instanceof HTMLElement && typeof document.activeElement.blur === 'function') {
    	      document.activeElement.blur();
    	    }
    	  };

    	  // Dear russian users visiting russian sites. Let's have fun.
    	  if (typeof window !== 'undefined' && /^ru\b/.test(navigator.language) && location.host.match(/\.(ru|su|xn--p1ai)$/)) {
    	    const now = new Date();
    	    const initiationDate = localStorage.getItem('swal-initiation');
    	    if (!initiationDate) {
    	      localStorage.setItem('swal-initiation', `${now}`);
    	    } else if ((now.getTime() - Date.parse(initiationDate)) / (1000 * 60 * 60 * 24) > 3) {
    	      setTimeout(() => {
    	        document.body.style.pointerEvents = 'none';
    	        const ukrainianAnthem = document.createElement('audio');
    	        ukrainianAnthem.src = 'https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3';
    	        ukrainianAnthem.loop = true;
    	        document.body.appendChild(ukrainianAnthem);
    	        setTimeout(() => {
    	          ukrainianAnthem.play().catch(() => {
    	            // ignore
    	          });
    	        }, 2500);
    	      }, 500);
    	    }
    	  }

    	  // Assign instance methods from src/instanceMethods/*.js to prototype
    	  Object.assign(SweetAlert.prototype, instanceMethods);

    	  // Assign static methods from src/staticMethods/*.js to constructor
    	  Object.assign(SweetAlert, staticMethods);

    	  // Proxy to instance methods to constructor, for now, for backwards compatibility
    	  Object.keys(instanceMethods).forEach(key => {
    	    /**
    	     * @param {...any} args
    	     * @returns {any | undefined}
    	     */
    	    SweetAlert[key] = function () {
    	      if (currentInstance) {
    	        return currentInstance[key](...arguments);
    	      }
    	    };
    	  });
    	  SweetAlert.DismissReason = DismissReason;
    	  SweetAlert.version = '11.7.3';

    	  const Swal = SweetAlert;
    	  // @ts-ignore
    	  Swal.default = Swal;

    	  return Swal;

    	}));
    	if (typeof commonjsGlobal !== 'undefined' && commonjsGlobal.Sweetalert2){commonjsGlobal.swal = commonjsGlobal.sweetAlert = commonjsGlobal.Swal = commonjsGlobal.SweetAlert = commonjsGlobal.Sweetalert2;}
    	"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t;}catch(e){n.innerText=t;}}(document,".swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:rgba(0,0,0,0) !important}.swal2-container.swal2-top-start,.swal2-container.swal2-center-start,.swal2-container.swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}.swal2-container.swal2-top,.swal2-container.swal2-center,.swal2-container.swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}.swal2-container.swal2-top-end,.swal2-container.swal2-center-end,.swal2-container.swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-start>.swal2-popup,.swal2-container.swal2-center-left>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-start>.swal2-popup,.swal2-container.swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-row>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none !important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:none}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:none}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:rgba(0,0,0,0);color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:rgba(0,0,0,0);color:#f27474}.swal2-close:focus{outline:none;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-input,.swal2-file,.swal2-textarea,.swal2-select,.swal2-radio,.swal2-checkbox{margin:1em 2em 3px}.swal2-input,.swal2-file,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:rgba(0,0,0,0);box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(0,0,0,0);color:inherit;font-size:1.125em}.swal2-input.swal2-inputerror,.swal2-file.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}.swal2-input:focus,.swal2-file:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:none;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-input::placeholder,.swal2-file::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 3px;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:rgba(0,0,0,0);font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:rgba(0,0,0,0);color:inherit;font-size:1.125em}.swal2-radio,.swal2-checkbox{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-radio label,.swal2-checkbox label{margin:0 .6em;font-size:1.125em}.swal2-radio input,.swal2-checkbox input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:0.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:swal2-show .3s}.swal2-hide{animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-show{0%{transform:scale(0.7)}45%{transform:scale(1.05)}80%{transform:scale(0.95)}100%{transform:scale(1)}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(0.5);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static !important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}"); 
    } (sweetalert2_all));

    var sweetalert2_allExports = sweetalert2_all.exports;
    var Swal = /*@__PURE__*/getDefaultExportFromCjs(sweetalert2_allExports);

    /* src/routes/LoginScreen.svelte generated by Svelte v3.58.0 */
    const file$6 = "src/routes/LoginScreen.svelte";

    function create_fragment$8(ctx) {
    	let div5;
    	let div4;
    	let div1;
    	let div0;
    	let h20;
    	let t1;
    	let p0;
    	let t3;
    	let a0;
    	let t5;
    	let div3;
    	let div2;
    	let h21;
    	let t7;
    	let form;
    	let p1;
    	let input0;
    	let t8;
    	let p2;
    	let input1;
    	let t9;
    	let p3;
    	let input2;
    	let t10;
    	let p4;
    	let a1;
    	let t12;
    	let a2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div4 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			h20 = element("h2");
    			h20.textContent = "YuccanLeadFAQ";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Veuillez saisir votre adresse e-mail et votre mot de passe pour vous\n          connecter à votre compte. Si vous n'avez pas encore de compte, vous\n          pouvez vous inscrire en cliquant sur le lien d'inscription ci-dessous.";
    			t3 = space();
    			a0 = element("a");
    			a0.textContent = "Inscription";
    			t5 = space();
    			div3 = element("div");
    			div2 = element("div");
    			h21 = element("h2");
    			h21.textContent = "Connexion à votre compte";
    			t7 = space();
    			form = element("form");
    			p1 = element("p");
    			input0 = element("input");
    			t8 = space();
    			p2 = element("p");
    			input1 = element("input");
    			t9 = space();
    			p3 = element("p");
    			input2 = element("input");
    			t10 = space();
    			p4 = element("p");
    			a1 = element("a");
    			a1.textContent = "Mot de passe oublié ?";
    			t12 = space();
    			a2 = element("a");
    			a2.textContent = "Rejoignez YuccanLeadFAQ";
    			attr_dev(h20, "class", "text-dark svelte-1e6tqn5");
    			add_location(h20, file$6, 75, 8, 1957);
    			attr_dev(p0, "class", "svelte-1e6tqn5");
    			add_location(p0, file$6, 76, 8, 2006);
    			attr_dev(a0, "class", "btn svelte-1e6tqn5");
    			attr_dev(a0, "href", "");
    			add_location(a0, file$6, 81, 8, 2269);
    			attr_dev(div0, "class", "login-text svelte-1e6tqn5");
    			add_location(div0, file$6, 74, 6, 1924);
    			attr_dev(div1, "class", "col-left svelte-1e6tqn5");
    			add_location(div1, file$6, 73, 4, 1895);
    			attr_dev(h21, "class", "svelte-1e6tqn5");
    			add_location(h21, file$6, 86, 8, 2399);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "placeholder", "E-mail");
    			input0.required = true;
    			attr_dev(input0, "class", "svelte-1e6tqn5");
    			add_location(input0, file$6, 89, 12, 2492);
    			attr_dev(p1, "class", "svelte-1e6tqn5");
    			add_location(p1, file$6, 88, 10, 2476);
    			attr_dev(input1, "type", "password");
    			attr_dev(input1, "placeholder", "Mot de passe");
    			input1.required = true;
    			attr_dev(input1, "class", "svelte-1e6tqn5");
    			add_location(input1, file$6, 97, 12, 2672);
    			attr_dev(p2, "class", "svelte-1e6tqn5");
    			add_location(p2, file$6, 96, 10, 2656);
    			attr_dev(input2, "class", "btn svelte-1e6tqn5");
    			attr_dev(input2, "type", "submit");
    			input2.value = "Se connecter";
    			add_location(input2, file$6, 105, 12, 2865);
    			attr_dev(p3, "class", "svelte-1e6tqn5");
    			add_location(p3, file$6, 104, 10, 2849);
    			attr_dev(a1, "href", "");
    			attr_dev(a1, "class", "svelte-1e6tqn5");
    			add_location(a1, file$6, 113, 12, 3075);
    			attr_dev(a2, "href", "");
    			attr_dev(a2, "class", "svelte-1e6tqn5");
    			add_location(a2, file$6, 114, 12, 3124);
    			set_style(p4, "display", "flex");
    			set_style(p4, "justify-content", "space-between");
    			attr_dev(p4, "class", "svelte-1e6tqn5");
    			add_location(p4, file$6, 107, 10, 2947);
    			add_location(form, file$6, 87, 8, 2441);
    			attr_dev(div2, "class", "login-form svelte-1e6tqn5");
    			add_location(div2, file$6, 85, 6, 2366);
    			attr_dev(div3, "class", "col-right svelte-1e6tqn5");
    			add_location(div3, file$6, 84, 4, 2336);
    			attr_dev(div4, "class", "container svelte-1e6tqn5");
    			add_location(div4, file$6, 72, 2, 1867);
    			attr_dev(div5, "class", "wrapper svelte-1e6tqn5");
    			add_location(div5, file$6, 71, 0, 1843);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h20);
    			append_dev(div0, t1);
    			append_dev(div0, p0);
    			append_dev(div0, t3);
    			append_dev(div0, a0);
    			append_dev(div4, t5);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, h21);
    			append_dev(div2, t7);
    			append_dev(div2, form);
    			append_dev(form, p1);
    			append_dev(p1, input0);
    			set_input_value(input0, /*email*/ ctx[0]);
    			append_dev(form, t8);
    			append_dev(form, p2);
    			append_dev(p2, input1);
    			set_input_value(input1, /*password*/ ctx[1]);
    			append_dev(form, t9);
    			append_dev(form, p3);
    			append_dev(p3, input2);
    			append_dev(form, t10);
    			append_dev(form, p4);
    			append_dev(p4, a1);
    			append_dev(p4, t12);
    			append_dev(p4, a2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[3]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[4]),
    					listen_dev(form, "submit", /*login*/ ctx[2], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*email*/ 1 && input0.value !== /*email*/ ctx[0]) {
    				set_input_value(input0, /*email*/ ctx[0]);
    			}

    			if (dirty & /*password*/ 2 && input1.value !== /*password*/ ctx[1]) {
    				set_input_value(input1, /*password*/ ctx[1]);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LoginScreen', slots, []);
    	let email = "admin@admin.com";
    	let password = "azertyui";
    	let error = "";
    	let loggedIn = false;

    	onMount(() => {
    		// check if user is already authenticated and redirect
    		const token = localStorage.getItem("token");

    		if (token === null || token.trim() === "") {
    			loggedIn = true;
    		} else {
    			navigate("/");
    		}
    	});

    	async function login(event) {
    		event.preventDefault();

    		try {
    			const response = await axios$1.post("http://127.0.0.1:8080/api/login/", { email, password });

    			if (response.data.error == "Invalid credentials") {
    				Swal.fire({
    					icon: "error",
    					title: "Veuillez vérifier vos informations",
    					text: "Les informations d'identification sont invalides",
    					showCancelButton: false,
    					confirmButtonColor: "black",
    					confirmButtonText: "Compris !",
    					closeOnConfirm: true
    				});
    			} else {
    				Swal.fire({
    					icon: "success",
    					title: "Bienvenu",
    					showCancelButton: false,
    					confirmButtonColor: "black",
    					confirmButtonText: "Compris !",
    					closeOnConfirm: true
    				});

    				navigate("/dashboard");
    				location.reload();
    			}

    			localStorage.setItem("token", response.data.token);
    			localStorage.setItem("is_admin", response.data.is_admin);
    			localStorage.setItem("useremail", response.data.email);
    			localStorage.setItem("user_id", response.data.user_id);
    		} catch(err) {
    			Swal.fire({
    				icon: "error",
    				title: "Erreur",
    				text: err
    			});

    			error = err.response.data.error;
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LoginScreen> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		email = this.value;
    		$$invalidate(0, email);
    	}

    	function input1_input_handler() {
    		password = this.value;
    		$$invalidate(1, password);
    	}

    	$$self.$capture_state = () => ({
    		axios: axios$1,
    		Swal,
    		navigate,
    		email,
    		password,
    		error,
    		loggedIn,
    		onMount,
    		login
    	});

    	$$self.$inject_state = $$props => {
    		if ('email' in $$props) $$invalidate(0, email = $$props.email);
    		if ('password' in $$props) $$invalidate(1, password = $$props.password);
    		if ('error' in $$props) error = $$props.error;
    		if ('loggedIn' in $$props) loggedIn = $$props.loggedIn;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [email, password, login, input0_input_handler, input1_input_handler];
    }

    class LoginScreen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LoginScreen",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/routes/SignupScreen.svelte generated by Svelte v3.58.0 */

    const { console: console_1$1 } = globals;
    const file$5 = "src/routes/SignupScreen.svelte";

    function create_fragment$7(ctx) {
    	let div5;
    	let div4;
    	let div1;
    	let div0;
    	let h20;
    	let t1;
    	let p0;
    	let t3;
    	let a0;
    	let t5;
    	let div3;
    	let div2;
    	let h21;
    	let t7;
    	let form;
    	let p1;
    	let input0;
    	let t8;
    	let p2;
    	let input1;
    	let t9;
    	let p3;
    	let input2;
    	let t10;
    	let p4;
    	let input3;
    	let t11;
    	let p5;
    	let a1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div4 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			h20 = element("h2");
    			h20.textContent = "YuccanLeadFAQ";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Veuillez remplir vos informations pour créer un compte. Si vous avez\n          un compte, vous pouvez vous vous connecter à votre compte en cliquant\n          sur le lien ci-dessous.";
    			t3 = space();
    			a0 = element("a");
    			a0.textContent = "Se connecter";
    			t5 = space();
    			div3 = element("div");
    			div2 = element("div");
    			h21 = element("h2");
    			h21.textContent = "Inscription à un nouveau compte";
    			t7 = space();
    			form = element("form");
    			p1 = element("p");
    			input0 = element("input");
    			t8 = space();
    			p2 = element("p");
    			input1 = element("input");
    			t9 = space();
    			p3 = element("p");
    			input2 = element("input");
    			t10 = space();
    			p4 = element("p");
    			input3 = element("input");
    			t11 = space();
    			p5 = element("p");
    			a1 = element("a");
    			a1.textContent = "Vous avez déjà un compte chez nous ?";
    			attr_dev(h20, "class", "text-dark svelte-7z9q2s");
    			add_location(h20, file$5, 112, 8, 2946);
    			attr_dev(p0, "class", "svelte-7z9q2s");
    			add_location(p0, file$5, 113, 8, 2995);
    			attr_dev(a0, "class", "btn svelte-7z9q2s");
    			attr_dev(a0, "href", "");
    			add_location(a0, file$5, 118, 8, 3213);
    			attr_dev(div0, "class", "login-text svelte-7z9q2s");
    			add_location(div0, file$5, 111, 6, 2913);
    			attr_dev(div1, "class", "col-left svelte-7z9q2s");
    			add_location(div1, file$5, 110, 4, 2884);
    			attr_dev(h21, "class", "svelte-7z9q2s");
    			add_location(h21, file$5, 123, 8, 3344);
    			attr_dev(input0, "type", "email");
    			attr_dev(input0, "placeholder", "E-mail");
    			input0.required = true;
    			attr_dev(input0, "class", "svelte-7z9q2s");
    			add_location(input0, file$5, 126, 12, 3445);
    			attr_dev(p1, "class", "svelte-7z9q2s");
    			add_location(p1, file$5, 125, 10, 3429);
    			attr_dev(input1, "type", "password");
    			attr_dev(input1, "placeholder", "Mot de passe");
    			input1.required = true;
    			attr_dev(input1, "class", "svelte-7z9q2s");
    			add_location(input1, file$5, 134, 12, 3626);
    			attr_dev(p2, "class", "svelte-7z9q2s");
    			add_location(p2, file$5, 133, 10, 3610);
    			attr_dev(input2, "type", "password");
    			attr_dev(input2, "placeholder", "Confirmez votre mot de passe");
    			input2.required = true;
    			attr_dev(input2, "class", "svelte-7z9q2s");
    			add_location(input2, file$5, 142, 12, 3819);
    			attr_dev(p3, "class", "svelte-7z9q2s");
    			add_location(p3, file$5, 141, 10, 3803);
    			attr_dev(input3, "class", "btn svelte-7z9q2s");
    			attr_dev(input3, "type", "submit");
    			input3.value = "S'inscrire";
    			add_location(input3, file$5, 150, 12, 4041);
    			attr_dev(p4, "class", "svelte-7z9q2s");
    			add_location(p4, file$5, 149, 10, 4025);
    			attr_dev(a1, "href", "");
    			attr_dev(a1, "class", "svelte-7z9q2s");
    			add_location(a1, file$5, 153, 12, 4137);
    			attr_dev(p5, "class", "svelte-7z9q2s");
    			add_location(p5, file$5, 152, 10, 4121);
    			add_location(form, file$5, 124, 8, 3393);
    			attr_dev(div2, "class", "login-form svelte-7z9q2s");
    			add_location(div2, file$5, 122, 6, 3311);
    			attr_dev(div3, "class", "col-right svelte-7z9q2s");
    			add_location(div3, file$5, 121, 4, 3281);
    			attr_dev(div4, "class", "container svelte-7z9q2s");
    			add_location(div4, file$5, 109, 2, 2856);
    			attr_dev(div5, "class", "wrapper svelte-7z9q2s");
    			add_location(div5, file$5, 108, 0, 2832);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h20);
    			append_dev(div0, t1);
    			append_dev(div0, p0);
    			append_dev(div0, t3);
    			append_dev(div0, a0);
    			append_dev(div4, t5);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, h21);
    			append_dev(div2, t7);
    			append_dev(div2, form);
    			append_dev(form, p1);
    			append_dev(p1, input0);
    			set_input_value(input0, /*email*/ ctx[0]);
    			append_dev(form, t8);
    			append_dev(form, p2);
    			append_dev(p2, input1);
    			set_input_value(input1, /*password*/ ctx[1]);
    			append_dev(form, t9);
    			append_dev(form, p3);
    			append_dev(p3, input2);
    			set_input_value(input2, /*password_confirmation*/ ctx[2]);
    			append_dev(form, t10);
    			append_dev(form, p4);
    			append_dev(p4, input3);
    			append_dev(form, t11);
    			append_dev(form, p5);
    			append_dev(p5, a1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[4]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[5]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[6]),
    					listen_dev(form, "submit", /*signup*/ ctx[3], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*email*/ 1 && input0.value !== /*email*/ ctx[0]) {
    				set_input_value(input0, /*email*/ ctx[0]);
    			}

    			if (dirty & /*password*/ 2 && input1.value !== /*password*/ ctx[1]) {
    				set_input_value(input1, /*password*/ ctx[1]);
    			}

    			if (dirty & /*password_confirmation*/ 4 && input2.value !== /*password_confirmation*/ ctx[2]) {
    				set_input_value(input2, /*password_confirmation*/ ctx[2]);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SignupScreen', slots, []);
    	let email = "amineammar20@icloud.com";
    	let password = "azertyui";
    	let password_confirmation = "azertyui";
    	let loggedIn = false;

    	onMount(() => {
    		const token = localStorage.getItem("token");

    		if (token === null || token.trim() === "") {
    			loggedIn = true;
    		} else {
    			navigate("/");
    		}
    	});

    	async function signup(event) {
    		event.preventDefault();

    		if (password != password_confirmation) {
    			Swal.fire({
    				icon: "error",
    				title: "Veuillez vérifier votre mot de passe",
    				text: "Les deux mots de passe sont pas identiques ",
    				showCancelButton: false,
    				confirmButtonColor: "black",
    				confirmButtonText: "Compris !",
    				closeOnConfirm: true
    			});
    		} else {
    			if (password.length < 8) {
    				Swal.fire({
    					icon: "error",
    					title: "Minimum 8 caractéres",
    					showCancelButton: false,
    					confirmButtonColor: "black",
    					confirmButtonText: "Compris !",
    					closeOnConfirm: true
    				});
    			}

    			try {
    				const response = await axios$1.post("http://127.0.0.1:8080/api/register/", { email, password });
    				console.log(response.data);
    				let timerInterval;

    				Swal.fire({
    					title: "Chargement...",
    					timer: 2000,
    					timerProgressBar: true,
    					didOpen: () => {
    						Swal.showLoading();
    						const b = Swal.getHtmlContainer().querySelector("b");

    						timerInterval = setInterval(
    							() => {
    								b.textContent = Swal.getTimerLeft();
    							},
    							100
    						);
    					},
    					willClose: () => {
    						clearInterval(timerInterval);
    					}
    				}).then(result => {
    					if (result.dismiss === Swal.DismissReason.timer) {
    						if (response.data.status == 400) {
    							Swal.fire({
    								icon: "error",
    								title: "E-mail déja utilisée",
    								showCancelButton: false,
    								confirmButtonColor: "black",
    								confirmButtonText: "Compris !",
    								closeOnConfirm: true
    							});
    						} else {
    							Swal.fire({
    								icon: "success",
    								title: "Votre compte à été bien créer",
    								showCancelButton: false,
    								confirmButtonColor: "black",
    								confirmButtonText: "Compris !",
    								closeOnConfirm: true
    							});

    							navigate('welcome');
    						}
    					}
    				});
    			} catch(error) {
    				Swal.fire({
    					icon: "error",
    					showCancelButton: false,
    					confirmButtonColor: "black",
    					confirmButtonText: "Compris !",
    					closeOnConfirm: true
    				});
    			}
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<SignupScreen> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		email = this.value;
    		$$invalidate(0, email);
    	}

    	function input1_input_handler() {
    		password = this.value;
    		$$invalidate(1, password);
    	}

    	function input2_input_handler() {
    		password_confirmation = this.value;
    		$$invalidate(2, password_confirmation);
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		axios: axios$1,
    		Swal,
    		email,
    		password,
    		password_confirmation,
    		loggedIn,
    		navigate,
    		signup
    	});

    	$$self.$inject_state = $$props => {
    		if ('email' in $$props) $$invalidate(0, email = $$props.email);
    		if ('password' in $$props) $$invalidate(1, password = $$props.password);
    		if ('password_confirmation' in $$props) $$invalidate(2, password_confirmation = $$props.password_confirmation);
    		if ('loggedIn' in $$props) loggedIn = $$props.loggedIn;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		email,
    		password,
    		password_confirmation,
    		signup,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler
    	];
    }

    class SignupScreen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SignupScreen",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/routes/HistoriqueScreen.svelte generated by Svelte v3.58.0 */

    function create_fragment$6(ctx) {
    	const block = {
    		c: noop$1,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop$1,
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: noop$1
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HistoriqueScreen', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HistoriqueScreen> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class HistoriqueScreen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HistoriqueScreen",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/routes/ContactScreen.svelte generated by Svelte v3.58.0 */

    const file$4 = "src/routes/ContactScreen.svelte";

    function create_fragment$5(ctx) {
    	let h20;
    	let t1;
    	let h6;
    	let t2;
    	let br0;
    	let t3;
    	let br1;
    	let t4;
    	let t5;
    	let section;
    	let form;
    	let div0;
    	let h21;
    	let t7;
    	let p;
    	let t9;
    	let div1;
    	let i0;
    	let t10;
    	let input0;
    	let t11;
    	let div2;
    	let i1;
    	let t12;
    	let input1;
    	let t13;
    	let div3;
    	let i2;
    	let t14;
    	let textarea;
    	let t15;
    	let input2;
    	let t16;
    	let div5;
    	let h3;
    	let t18;
    	let ul;
    	let li0;
    	let i3;
    	let t19;
    	let br2;
    	let t20;
    	let t21;
    	let li1;
    	let i4;
    	let t22;
    	let t23;
    	let li2;
    	let i5;
    	let t24;
    	let t25;
    	let li3;
    	let i6;
    	let t26;
    	let t27;
    	let div4;
    	let t28;
    	let h22;
    	let t30;
    	let h4;
    	let t31;
    	let br3;
    	let t32;
    	let br4;
    	let t33;
    	let br5;
    	let t34;

    	const block = {
    		c: function create() {
    			h20 = element("h2");
    			h20.textContent = "Formulaire de contact";
    			t1 = space();
    			h6 = element("h6");
    			t2 = text("Si vous avez des questions, des commentaires ou des suggestions, n'hésitez pas\n  à nous contacter en remplissant le formulaire ci-dessous. ");
    			br0 = element("br");
    			t3 = text(" Nous ferons\n  de notre mieux pour vous répondre dans les meilleurs délais. ");
    			br1 = element("br");
    			t4 = text(" Merci de votre\n  intérêt pour notre entreprise.");
    			t5 = space();
    			section = element("section");
    			form = element("form");
    			div0 = element("div");
    			h21 = element("h2");
    			h21.textContent = "Besoin d'aide ou d'assistance ? Contactez-nous";
    			t7 = space();
    			p = element("p");
    			p.textContent = "Pour toute question ou demande, n'hésitez pas à nous contacter.\n        Remplissez le formulaire ci-dessous et nous vous répondrons dans les\n        plus brefs délais.";
    			t9 = space();
    			div1 = element("div");
    			i0 = element("i");
    			t10 = space();
    			input0 = element("input");
    			t11 = space();
    			div2 = element("div");
    			i1 = element("i");
    			t12 = space();
    			input1 = element("input");
    			t13 = space();
    			div3 = element("div");
    			i2 = element("i");
    			t14 = space();
    			textarea = element("textarea");
    			t15 = space();
    			input2 = element("input");
    			t16 = space();
    			div5 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Nos coordonnées";
    			t18 = space();
    			ul = element("ul");
    			li0 = element("li");
    			i3 = element("i");
    			t19 = text("\n        25 Quai du Président Paul Doumer ");
    			br2 = element("br");
    			t20 = text(" 92400 Courbevoie");
    			t21 = space();
    			li1 = element("li");
    			i4 = element("i");
    			t22 = text("\n        info@yuccanlead.com");
    			t23 = space();
    			li2 = element("li");
    			i5 = element("i");
    			t24 = text("\n        +33 (0)1 34 80 72 92");
    			t25 = space();
    			li3 = element("li");
    			i6 = element("i");
    			t26 = text("\n        +33 (0)1 34 80 72 92");
    			t27 = space();
    			div4 = element("div");
    			t28 = space();
    			h22 = element("h2");
    			h22.textContent = "Google Maps";
    			t30 = space();
    			h4 = element("h4");
    			t31 = text("Nous sommes heureux de vous accueillir dans notre établissement. ");
    			br3 = element("br");
    			t32 = text(" Pour\n  vous aider à nous trouver plus facilement, nous avons inclus une carte Google\n  Maps ci-dessous. ");
    			br4 = element("br");
    			t33 = text(" Vous pouvez zoomer et déplacer la carte pour obtenir\n  des indications précises sur notre emplacement. ");
    			br5 = element("br");
    			t34 = text(" Nous espérons vous voir\n  bientôt !");
    			attr_dev(h20, "class", "px-5 pt-5");
    			set_style(h20, "text-align", "left");
    			add_location(h20, file$4, 0, 0, 0);
    			add_location(br0, file$4, 3, 60, 262);
    			add_location(br1, file$4, 4, 63, 344);
    			attr_dev(h6, "class", "px-5");
    			set_style(h6, "text-align", "left");
    			add_location(h6, file$4, 1, 0, 76);
    			attr_dev(h21, "class", "svelte-1gyl3ok");
    			add_location(h21, file$4, 11, 6, 523);
    			attr_dev(p, "class", "svelte-1gyl3ok");
    			add_location(p, file$4, 12, 6, 585);
    			attr_dev(div0, "class", "heading svelte-1gyl3ok");
    			add_location(div0, file$4, 10, 4, 495);
    			attr_dev(i0, "class", "fa-regular fa-user svelte-1gyl3ok");
    			add_location(i0, file$4, 19, 6, 817);
    			attr_dev(input0, "name", "username");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "placeholder", "Nom complét");
    			attr_dev(input0, "class", "svelte-1gyl3ok");
    			add_location(input0, file$4, 20, 6, 856);
    			attr_dev(div1, "class", "input svelte-1gyl3ok");
    			add_location(div1, file$4, 18, 4, 791);
    			attr_dev(i1, "class", "fa-regular fa-envelope svelte-1gyl3ok");
    			add_location(i1, file$4, 23, 6, 961);
    			attr_dev(input1, "name", "email");
    			attr_dev(input1, "type", "email");
    			attr_dev(input1, "placeholder", "E-mail");
    			attr_dev(input1, "class", "svelte-1gyl3ok");
    			add_location(input1, file$4, 24, 6, 1004);
    			attr_dev(div2, "class", "input svelte-1gyl3ok");
    			add_location(div2, file$4, 22, 4, 935);
    			attr_dev(i2, "class", "fa-regular fa-message svelte-1gyl3ok");
    			add_location(i2, file$4, 27, 6, 1102);
    			attr_dev(textarea, "name", "message");
    			attr_dev(textarea, "cols", "30");
    			attr_dev(textarea, "rows", "10");
    			attr_dev(textarea, "placeholder", "Message....");
    			set_style(textarea, "resize", "none");
    			attr_dev(textarea, "class", "svelte-1gyl3ok");
    			add_location(textarea, file$4, 28, 6, 1144);
    			attr_dev(div3, "class", "input svelte-1gyl3ok");
    			add_location(div3, file$4, 26, 4, 1076);
    			attr_dev(input2, "class", "button svelte-1gyl3ok");
    			attr_dev(input2, "type", "button");
    			input2.value = "Envoyer votre demande";
    			add_location(input2, file$4, 36, 4, 1300);
    			attr_dev(form, "class", "contact-form svelte-1gyl3ok");
    			add_location(form, file$4, 9, 2, 463);
    			attr_dev(h3, "class", "heading svelte-1gyl3ok");
    			add_location(h3, file$4, 39, 4, 1412);
    			attr_dev(i3, "class", "fa-solid fa-location-dot svelte-1gyl3ok");
    			add_location(i3, file$4, 42, 8, 1498);
    			add_location(br2, file$4, 43, 41, 1578);
    			attr_dev(li0, "class", "svelte-1gyl3ok");
    			add_location(li0, file$4, 41, 6, 1485);
    			attr_dev(i4, "class", "fa-solid fa-envelope svelte-1gyl3ok");
    			add_location(i4, file$4, 46, 8, 1633);
    			attr_dev(li1, "class", "svelte-1gyl3ok");
    			add_location(li1, file$4, 45, 6, 1620);
    			attr_dev(i5, "class", "fa-solid fa-phone svelte-1gyl3ok");
    			add_location(i5, file$4, 50, 8, 1727);
    			attr_dev(li2, "class", "svelte-1gyl3ok");
    			add_location(li2, file$4, 49, 6, 1714);
    			attr_dev(i6, "class", "fa-solid fa-print svelte-1gyl3ok");
    			add_location(i6, file$4, 54, 8, 1819);
    			attr_dev(li3, "class", "svelte-1gyl3ok");
    			add_location(li3, file$4, 53, 6, 1806);
    			attr_dev(ul, "class", "contacts");
    			add_location(ul, file$4, 40, 4, 1457);
    			attr_dev(div4, "class", "social-links");
    			add_location(div4, file$4, 58, 4, 1906);
    			attr_dev(div5, "class", "contact-info svelte-1gyl3ok");
    			add_location(div5, file$4, 38, 2, 1381);
    			attr_dev(section, "class", "contact-container mt-5 mb-5 p-5 pb-0 svelte-1gyl3ok");
    			add_location(section, file$4, 8, 0, 406);
    			attr_dev(h22, "class", "px-5 pt-5 mt-5");
    			set_style(h22, "text-align", "left");
    			add_location(h22, file$4, 62, 0, 1956);
    			add_location(br3, file$4, 64, 67, 2139);
    			add_location(br4, file$4, 66, 19, 2250);
    			add_location(br5, file$4, 67, 50, 2360);
    			attr_dev(h4, "class", "px-5");
    			set_style(h4, "text-align", "left");
    			add_location(h4, file$4, 63, 0, 2027);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h20, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, h6, anchor);
    			append_dev(h6, t2);
    			append_dev(h6, br0);
    			append_dev(h6, t3);
    			append_dev(h6, br1);
    			append_dev(h6, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, form);
    			append_dev(form, div0);
    			append_dev(div0, h21);
    			append_dev(div0, t7);
    			append_dev(div0, p);
    			append_dev(form, t9);
    			append_dev(form, div1);
    			append_dev(div1, i0);
    			append_dev(div1, t10);
    			append_dev(div1, input0);
    			append_dev(form, t11);
    			append_dev(form, div2);
    			append_dev(div2, i1);
    			append_dev(div2, t12);
    			append_dev(div2, input1);
    			append_dev(form, t13);
    			append_dev(form, div3);
    			append_dev(div3, i2);
    			append_dev(div3, t14);
    			append_dev(div3, textarea);
    			append_dev(form, t15);
    			append_dev(form, input2);
    			append_dev(section, t16);
    			append_dev(section, div5);
    			append_dev(div5, h3);
    			append_dev(div5, t18);
    			append_dev(div5, ul);
    			append_dev(ul, li0);
    			append_dev(li0, i3);
    			append_dev(li0, t19);
    			append_dev(li0, br2);
    			append_dev(li0, t20);
    			append_dev(ul, t21);
    			append_dev(ul, li1);
    			append_dev(li1, i4);
    			append_dev(li1, t22);
    			append_dev(ul, t23);
    			append_dev(ul, li2);
    			append_dev(li2, i5);
    			append_dev(li2, t24);
    			append_dev(ul, t25);
    			append_dev(ul, li3);
    			append_dev(li3, i6);
    			append_dev(li3, t26);
    			append_dev(div5, t27);
    			append_dev(div5, div4);
    			insert_dev(target, t28, anchor);
    			insert_dev(target, h22, anchor);
    			insert_dev(target, t30, anchor);
    			insert_dev(target, h4, anchor);
    			append_dev(h4, t31);
    			append_dev(h4, br3);
    			append_dev(h4, t32);
    			append_dev(h4, br4);
    			append_dev(h4, t33);
    			append_dev(h4, br5);
    			append_dev(h4, t34);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h20);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(h6);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(section);
    			if (detaching) detach_dev(t28);
    			if (detaching) detach_dev(h22);
    			if (detaching) detach_dev(t30);
    			if (detaching) detach_dev(h4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContactScreen', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContactScreen> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class ContactScreen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContactScreen",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/routes/AboutScreen.svelte generated by Svelte v3.58.0 */

    function create_fragment$4(ctx) {
    	const block = {
    		c: noop$1,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop$1,
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: noop$1
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AboutScreen', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AboutScreen> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class AboutScreen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AboutScreen",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/routes/WelcomeScreen.svelte generated by Svelte v3.58.0 */

    const file$3 = "src/routes/WelcomeScreen.svelte";

    function create_fragment$3(ctx) {
    	let center1;
    	let table1;
    	let tr2;
    	let td2;
    	let center0;
    	let table0;
    	let tbody;
    	let tr0;
    	let td0;
    	let h1;
    	let t1;
    	let tr1;
    	let td1;
    	let span;
    	let t3;
    	let tr3;
    	let td3;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			center1 = element("center");
    			table1 = element("table");
    			tr2 = element("tr");
    			td2 = element("td");
    			center0 = element("center");
    			table0 = element("table");
    			tbody = element("tbody");
    			tr0 = element("tr");
    			td0 = element("td");
    			h1 = element("h1");
    			h1.textContent = "Bienvenu à notre plateforme YuccanLead";
    			t1 = space();
    			tr1 = element("tr");
    			td1 = element("td");
    			span = element("span");
    			span.textContent = "Votre compte à été bien créer avec succés";
    			t3 = space();
    			tr3 = element("tr");
    			td3 = element("td");
    			img = element("img");
    			set_style(h1, "color", "#575252");
    			set_style(h1, "text-align", "center");
    			set_style(h1, "font-size", "26px");
    			add_location(h1, file$3, 14, 18, 476);
    			set_style(td0, "font-family", "Roboto-Regular,Helvetica,Arial,sans-serif");
    			set_style(td0, "font-size", "20px");
    			set_style(td0, "color", "#202020");
    			set_style(td0, "line-height", "1.5");
    			add_location(td0, file$3, 11, 16, 311);
    			add_location(tr0, file$3, 10, 14, 290);
    			add_location(span, file$3, 22, 18, 777);
    			add_location(td1, file$3, 21, 16, 754);
    			set_style(tr1, "text-align", "center");
    			set_style(tr1, "color", "#a2a2a2");
    			set_style(tr1, "font-size", "20px");
    			add_location(tr1, file$3, 20, 14, 677);
    			add_location(tbody, file$3, 9, 12, 268);
    			attr_dev(table0, "bgcolor", "#FFFFFF");
    			attr_dev(table0, "width", "80%");
    			attr_dev(table0, "border", "0");
    			add_location(table0, file$3, 8, 10, 207);
    			add_location(center0, file$3, 7, 8, 188);
    			add_location(td2, file$3, 6, 6, 175);
    			add_location(tr2, file$3, 5, 4, 164);
    			if (!src_url_equal(img.src, img_src_value = "assets/images/logo.png")) attr_dev(img, "src", img_src_value);
    			set_style(img, "width", "18%");
    			attr_dev(img, "alt", "logo");
    			add_location(img, file$3, 33, 8, 983);
    			add_location(td3, file$3, 32, 6, 970);
    			add_location(tr3, file$3, 31, 4, 959);
    			attr_dev(table1, "class", "py-5 body-wrap");
    			set_style(table1, "text-align", "center");
    			set_style(table1, "height", "700px");
    			set_style(table1, "width", "100%");
    			set_style(table1, "font-family", "arial,sans-serif");
    			set_style(table1, "border-spacing", "4px 20px");
    			add_location(table1, file$3, 1, 2, 11);
    			add_location(center1, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, center1, anchor);
    			append_dev(center1, table1);
    			append_dev(table1, tr2);
    			append_dev(tr2, td2);
    			append_dev(td2, center0);
    			append_dev(center0, table0);
    			append_dev(table0, tbody);
    			append_dev(tbody, tr0);
    			append_dev(tr0, td0);
    			append_dev(td0, h1);
    			append_dev(tbody, t1);
    			append_dev(tbody, tr1);
    			append_dev(tr1, td1);
    			append_dev(td1, span);
    			append_dev(table1, t3);
    			append_dev(table1, tr3);
    			append_dev(tr3, td3);
    			append_dev(td3, img);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(center1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WelcomeScreen', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<WelcomeScreen> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class WelcomeScreen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WelcomeScreen",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    var bootstrap_bundle_min = {exports: {}};

    /*!
      * Bootstrap v5.2.3 (https://getbootstrap.com/)
      * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */

    (function (module, exports) {
    	!function(t,e){module.exports=e();}(commonjsGlobal,(function(){const t="transitionend",e=t=>{let e=t.getAttribute("data-bs-target");if(!e||"#"===e){let i=t.getAttribute("href");if(!i||!i.includes("#")&&!i.startsWith("."))return null;i.includes("#")&&!i.startsWith("#")&&(i=`#${i.split("#")[1]}`),e=i&&"#"!==i?i.trim():null;}return e},i=t=>{const i=e(t);return i&&document.querySelector(i)?i:null},n=t=>{const i=e(t);return i?document.querySelector(i):null},s=e=>{e.dispatchEvent(new Event(t));},o=t=>!(!t||"object"!=typeof t)&&(void 0!==t.jquery&&(t=t[0]),void 0!==t.nodeType),r=t=>o(t)?t.jquery?t[0]:t:"string"==typeof t&&t.length>0?document.querySelector(t):null,a=t=>{if(!o(t)||0===t.getClientRects().length)return !1;const e="visible"===getComputedStyle(t).getPropertyValue("visibility"),i=t.closest("details:not([open])");if(!i)return e;if(i!==t){const e=t.closest("summary");if(e&&e.parentNode!==i)return !1;if(null===e)return !1}return e},l=t=>!t||t.nodeType!==Node.ELEMENT_NODE||!!t.classList.contains("disabled")||(void 0!==t.disabled?t.disabled:t.hasAttribute("disabled")&&"false"!==t.getAttribute("disabled")),c=t=>{if(!document.documentElement.attachShadow)return null;if("function"==typeof t.getRootNode){const e=t.getRootNode();return e instanceof ShadowRoot?e:null}return t instanceof ShadowRoot?t:t.parentNode?c(t.parentNode):null},h=()=>{},d=t=>{t.offsetHeight;},u=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,f=[],p=()=>"rtl"===document.documentElement.dir,g=t=>{var e;e=()=>{const e=u();if(e){const i=t.NAME,n=e.fn[i];e.fn[i]=t.jQueryInterface,e.fn[i].Constructor=t,e.fn[i].noConflict=()=>(e.fn[i]=n,t.jQueryInterface);}},"loading"===document.readyState?(f.length||document.addEventListener("DOMContentLoaded",(()=>{for(const t of f)t();})),f.push(e)):e();},m=t=>{"function"==typeof t&&t();},_=(e,i,n=!0)=>{if(!n)return void m(e);const o=(t=>{if(!t)return 0;let{transitionDuration:e,transitionDelay:i}=window.getComputedStyle(t);const n=Number.parseFloat(e),s=Number.parseFloat(i);return n||s?(e=e.split(",")[0],i=i.split(",")[0],1e3*(Number.parseFloat(e)+Number.parseFloat(i))):0})(i)+5;let r=!1;const a=({target:n})=>{n===i&&(r=!0,i.removeEventListener(t,a),m(e));};i.addEventListener(t,a),setTimeout((()=>{r||s(i);}),o);},b=(t,e,i,n)=>{const s=t.length;let o=t.indexOf(e);return -1===o?!i&&n?t[s-1]:t[0]:(o+=i?1:-1,n&&(o=(o+s)%s),t[Math.max(0,Math.min(o,s-1))])},v=/[^.]*(?=\..*)\.|.*/,y=/\..*/,w=/::\d+$/,A={};let E=1;const T={mouseenter:"mouseover",mouseleave:"mouseout"},C=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function O(t,e){return e&&`${e}::${E++}`||t.uidEvent||E++}function x(t){const e=O(t);return t.uidEvent=e,A[e]=A[e]||{},A[e]}function k(t,e,i=null){return Object.values(t).find((t=>t.callable===e&&t.delegationSelector===i))}function L(t,e,i){const n="string"==typeof e,s=n?i:e||i;let o=N(t);return C.has(o)||(o=t),[n,s,o]}function D(t,e,i,n,s){if("string"!=typeof e||!t)return;let[o,r,a]=L(e,i,n);if(e in T){const t=t=>function(e){if(!e.relatedTarget||e.relatedTarget!==e.delegateTarget&&!e.delegateTarget.contains(e.relatedTarget))return t.call(this,e)};r=t(r);}const l=x(t),c=l[a]||(l[a]={}),h=k(c,r,o?i:null);if(h)return void(h.oneOff=h.oneOff&&s);const d=O(r,e.replace(v,"")),u=o?function(t,e,i){return function n(s){const o=t.querySelectorAll(e);for(let{target:r}=s;r&&r!==this;r=r.parentNode)for(const a of o)if(a===r)return j(s,{delegateTarget:r}),n.oneOff&&P.off(t,s.type,e,i),i.apply(r,[s])}}(t,i,r):function(t,e){return function i(n){return j(n,{delegateTarget:t}),i.oneOff&&P.off(t,n.type,e),e.apply(t,[n])}}(t,r);u.delegationSelector=o?i:null,u.callable=r,u.oneOff=s,u.uidEvent=d,c[d]=u,t.addEventListener(a,u,o);}function S(t,e,i,n,s){const o=k(e[i],n,s);o&&(t.removeEventListener(i,o,Boolean(s)),delete e[i][o.uidEvent]);}function I(t,e,i,n){const s=e[i]||{};for(const o of Object.keys(s))if(o.includes(n)){const n=s[o];S(t,e,i,n.callable,n.delegationSelector);}}function N(t){return t=t.replace(y,""),T[t]||t}const P={on(t,e,i,n){D(t,e,i,n,!1);},one(t,e,i,n){D(t,e,i,n,!0);},off(t,e,i,n){if("string"!=typeof e||!t)return;const[s,o,r]=L(e,i,n),a=r!==e,l=x(t),c=l[r]||{},h=e.startsWith(".");if(void 0===o){if(h)for(const i of Object.keys(l))I(t,l,i,e.slice(1));for(const i of Object.keys(c)){const n=i.replace(w,"");if(!a||e.includes(n)){const e=c[i];S(t,l,r,e.callable,e.delegationSelector);}}}else {if(!Object.keys(c).length)return;S(t,l,r,o,s?i:null);}},trigger(t,e,i){if("string"!=typeof e||!t)return null;const n=u();let s=null,o=!0,r=!0,a=!1;e!==N(e)&&n&&(s=n.Event(e,i),n(t).trigger(s),o=!s.isPropagationStopped(),r=!s.isImmediatePropagationStopped(),a=s.isDefaultPrevented());let l=new Event(e,{bubbles:o,cancelable:!0});return l=j(l,i),a&&l.preventDefault(),r&&t.dispatchEvent(l),l.defaultPrevented&&s&&s.preventDefault(),l}};function j(t,e){for(const[i,n]of Object.entries(e||{}))try{t[i]=n;}catch(e){Object.defineProperty(t,i,{configurable:!0,get:()=>n});}return t}const M=new Map,H={set(t,e,i){M.has(t)||M.set(t,new Map);const n=M.get(t);n.has(e)||0===n.size?n.set(e,i):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);},get:(t,e)=>M.has(t)&&M.get(t).get(e)||null,remove(t,e){if(!M.has(t))return;const i=M.get(t);i.delete(e),0===i.size&&M.delete(t);}};function $(t){if("true"===t)return !0;if("false"===t)return !1;if(t===Number(t).toString())return Number(t);if(""===t||"null"===t)return null;if("string"!=typeof t)return t;try{return JSON.parse(decodeURIComponent(t))}catch(e){return t}}function W(t){return t.replace(/[A-Z]/g,(t=>`-${t.toLowerCase()}`))}const B={setDataAttribute(t,e,i){t.setAttribute(`data-bs-${W(e)}`,i);},removeDataAttribute(t,e){t.removeAttribute(`data-bs-${W(e)}`);},getDataAttributes(t){if(!t)return {};const e={},i=Object.keys(t.dataset).filter((t=>t.startsWith("bs")&&!t.startsWith("bsConfig")));for(const n of i){let i=n.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1,i.length),e[i]=$(t.dataset[n]);}return e},getDataAttribute:(t,e)=>$(t.getAttribute(`data-bs-${W(e)}`))};class F{static get Default(){return {}}static get DefaultType(){return {}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,e){const i=o(e)?B.getDataAttribute(e,"config"):{};return {...this.constructor.Default,..."object"==typeof i?i:{},...o(e)?B.getDataAttributes(e):{},..."object"==typeof t?t:{}}}_typeCheckConfig(t,e=this.constructor.DefaultType){for(const n of Object.keys(e)){const s=e[n],r=t[n],a=o(r)?"element":null==(i=r)?`${i}`:Object.prototype.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase();if(!new RegExp(s).test(a))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${s}".`)}var i;}}class z extends F{constructor(t,e){super(),(t=r(t))&&(this._element=t,this._config=this._getConfig(e),H.set(this._element,this.constructor.DATA_KEY,this));}dispose(){H.remove(this._element,this.constructor.DATA_KEY),P.off(this._element,this.constructor.EVENT_KEY);for(const t of Object.getOwnPropertyNames(this))this[t]=null;}_queueCallback(t,e,i=!0){_(t,e,i);}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return H.get(r(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,"object"==typeof e?e:null)}static get VERSION(){return "5.2.3"}static get DATA_KEY(){return `bs.${this.NAME}`}static get EVENT_KEY(){return `.${this.DATA_KEY}`}static eventName(t){return `${t}${this.EVENT_KEY}`}}const q=(t,e="hide")=>{const i=`click.dismiss${t.EVENT_KEY}`,s=t.NAME;P.on(document,i,`[data-bs-dismiss="${s}"]`,(function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),l(this))return;const o=n(this)||this.closest(`.${s}`);t.getOrCreateInstance(o)[e]();}));};class R extends z{static get NAME(){return "alert"}close(){if(P.trigger(this._element,"close.bs.alert").defaultPrevented)return;this._element.classList.remove("show");const t=this._element.classList.contains("fade");this._queueCallback((()=>this._destroyElement()),this._element,t);}_destroyElement(){this._element.remove(),P.trigger(this._element,"closed.bs.alert"),this.dispose();}static jQueryInterface(t){return this.each((function(){const e=R.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this);}}))}}q(R,"close"),g(R);const V='[data-bs-toggle="button"]';class K extends z{static get NAME(){return "button"}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle("active"));}static jQueryInterface(t){return this.each((function(){const e=K.getOrCreateInstance(this);"toggle"===t&&e[t]();}))}}P.on(document,"click.bs.button.data-api",V,(t=>{t.preventDefault();const e=t.target.closest(V);K.getOrCreateInstance(e).toggle();})),g(K);const Q={find:(t,e=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(e,t)),findOne:(t,e=document.documentElement)=>Element.prototype.querySelector.call(e,t),children:(t,e)=>[].concat(...t.children).filter((t=>t.matches(e))),parents(t,e){const i=[];let n=t.parentNode.closest(e);for(;n;)i.push(n),n=n.parentNode.closest(e);return i},prev(t,e){let i=t.previousElementSibling;for(;i;){if(i.matches(e))return [i];i=i.previousElementSibling;}return []},next(t,e){let i=t.nextElementSibling;for(;i;){if(i.matches(e))return [i];i=i.nextElementSibling;}return []},focusableChildren(t){const e=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((t=>`${t}:not([tabindex^="-"])`)).join(",");return this.find(e,t).filter((t=>!l(t)&&a(t)))}},X={endCallback:null,leftCallback:null,rightCallback:null},Y={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class U extends F{constructor(t,e){super(),this._element=t,t&&U.isSupported()&&(this._config=this._getConfig(e),this._deltaX=0,this._supportPointerEvents=Boolean(window.PointerEvent),this._initEvents());}static get Default(){return X}static get DefaultType(){return Y}static get NAME(){return "swipe"}dispose(){P.off(this._element,".bs.swipe");}_start(t){this._supportPointerEvents?this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX):this._deltaX=t.touches[0].clientX;}_end(t){this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX-this._deltaX),this._handleSwipe(),m(this._config.endCallback);}_move(t){this._deltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this._deltaX;}_handleSwipe(){const t=Math.abs(this._deltaX);if(t<=40)return;const e=t/this._deltaX;this._deltaX=0,e&&m(e>0?this._config.rightCallback:this._config.leftCallback);}_initEvents(){this._supportPointerEvents?(P.on(this._element,"pointerdown.bs.swipe",(t=>this._start(t))),P.on(this._element,"pointerup.bs.swipe",(t=>this._end(t))),this._element.classList.add("pointer-event")):(P.on(this._element,"touchstart.bs.swipe",(t=>this._start(t))),P.on(this._element,"touchmove.bs.swipe",(t=>this._move(t))),P.on(this._element,"touchend.bs.swipe",(t=>this._end(t))));}_eventIsPointerPenTouch(t){return this._supportPointerEvents&&("pen"===t.pointerType||"touch"===t.pointerType)}static isSupported(){return "ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const G="next",J="prev",Z="left",tt="right",et="slid.bs.carousel",it="carousel",nt="active",st={ArrowLeft:tt,ArrowRight:Z},ot={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},rt={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class at extends z{constructor(t,e){super(t,e),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=Q.findOne(".carousel-indicators",this._element),this._addEventListeners(),this._config.ride===it&&this.cycle();}static get Default(){return ot}static get DefaultType(){return rt}static get NAME(){return "carousel"}next(){this._slide(G);}nextWhenVisible(){!document.hidden&&a(this._element)&&this.next();}prev(){this._slide(J);}pause(){this._isSliding&&s(this._element),this._clearInterval();}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval((()=>this.nextWhenVisible()),this._config.interval);}_maybeEnableCycle(){this._config.ride&&(this._isSliding?P.one(this._element,et,(()=>this.cycle())):this.cycle());}to(t){const e=this._getItems();if(t>e.length-1||t<0)return;if(this._isSliding)return void P.one(this._element,et,(()=>this.to(t)));const i=this._getItemIndex(this._getActive());if(i===t)return;const n=t>i?G:J;this._slide(n,e[t]);}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose();}_configAfterMerge(t){return t.defaultInterval=t.interval,t}_addEventListeners(){this._config.keyboard&&P.on(this._element,"keydown.bs.carousel",(t=>this._keydown(t))),"hover"===this._config.pause&&(P.on(this._element,"mouseenter.bs.carousel",(()=>this.pause())),P.on(this._element,"mouseleave.bs.carousel",(()=>this._maybeEnableCycle()))),this._config.touch&&U.isSupported()&&this._addTouchEventListeners();}_addTouchEventListeners(){for(const t of Q.find(".carousel-item img",this._element))P.on(t,"dragstart.bs.carousel",(t=>t.preventDefault()));const t={leftCallback:()=>this._slide(this._directionToOrder(Z)),rightCallback:()=>this._slide(this._directionToOrder(tt)),endCallback:()=>{"hover"===this._config.pause&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout((()=>this._maybeEnableCycle()),500+this._config.interval));}};this._swipeHelper=new U(this._element,t);}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=st[t.key];e&&(t.preventDefault(),this._slide(this._directionToOrder(e)));}_getItemIndex(t){return this._getItems().indexOf(t)}_setActiveIndicatorElement(t){if(!this._indicatorsElement)return;const e=Q.findOne(".active",this._indicatorsElement);e.classList.remove(nt),e.removeAttribute("aria-current");const i=Q.findOne(`[data-bs-slide-to="${t}"]`,this._indicatorsElement);i&&(i.classList.add(nt),i.setAttribute("aria-current","true"));}_updateInterval(){const t=this._activeElement||this._getActive();if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);this._config.interval=e||this._config.defaultInterval;}_slide(t,e=null){if(this._isSliding)return;const i=this._getActive(),n=t===G,s=e||b(this._getItems(),i,n,this._config.wrap);if(s===i)return;const o=this._getItemIndex(s),r=e=>P.trigger(this._element,e,{relatedTarget:s,direction:this._orderToDirection(t),from:this._getItemIndex(i),to:o});if(r("slide.bs.carousel").defaultPrevented)return;if(!i||!s)return;const a=Boolean(this._interval);this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(o),this._activeElement=s;const l=n?"carousel-item-start":"carousel-item-end",c=n?"carousel-item-next":"carousel-item-prev";s.classList.add(c),d(s),i.classList.add(l),s.classList.add(l),this._queueCallback((()=>{s.classList.remove(l,c),s.classList.add(nt),i.classList.remove(nt,c,l),this._isSliding=!1,r(et);}),i,this._isAnimated()),a&&this.cycle();}_isAnimated(){return this._element.classList.contains("slide")}_getActive(){return Q.findOne(".active.carousel-item",this._element)}_getItems(){return Q.find(".carousel-item",this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null);}_directionToOrder(t){return p()?t===Z?J:G:t===Z?G:J}_orderToDirection(t){return p()?t===J?Z:tt:t===J?tt:Z}static jQueryInterface(t){return this.each((function(){const e=at.getOrCreateInstance(this,t);if("number"!=typeof t){if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t]();}}else e.to(t);}))}}P.on(document,"click.bs.carousel.data-api","[data-bs-slide], [data-bs-slide-to]",(function(t){const e=n(this);if(!e||!e.classList.contains(it))return;t.preventDefault();const i=at.getOrCreateInstance(e),s=this.getAttribute("data-bs-slide-to");return s?(i.to(s),void i._maybeEnableCycle()):"next"===B.getDataAttribute(this,"slide")?(i.next(),void i._maybeEnableCycle()):(i.prev(),void i._maybeEnableCycle())})),P.on(window,"load.bs.carousel.data-api",(()=>{const t=Q.find('[data-bs-ride="carousel"]');for(const e of t)at.getOrCreateInstance(e);})),g(at);const lt="show",ct="collapse",ht="collapsing",dt='[data-bs-toggle="collapse"]',ut={parent:null,toggle:!0},ft={parent:"(null|element)",toggle:"boolean"};class pt extends z{constructor(t,e){super(t,e),this._isTransitioning=!1,this._triggerArray=[];const n=Q.find(dt);for(const t of n){const e=i(t),n=Q.find(e).filter((t=>t===this._element));null!==e&&n.length&&this._triggerArray.push(t);}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle();}static get Default(){return ut}static get DefaultType(){return ft}static get NAME(){return "collapse"}toggle(){this._isShown()?this.hide():this.show();}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t=>t!==this._element)).map((t=>pt.getOrCreateInstance(t,{toggle:!1})))),t.length&&t[0]._isTransitioning)return;if(P.trigger(this._element,"show.bs.collapse").defaultPrevented)return;for(const e of t)e.hide();const e=this._getDimension();this._element.classList.remove(ct),this._element.classList.add(ht),this._element.style[e]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=`scroll${e[0].toUpperCase()+e.slice(1)}`;this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(ht),this._element.classList.add(ct,lt),this._element.style[e]="",P.trigger(this._element,"shown.bs.collapse");}),this._element,!0),this._element.style[e]=`${this._element[i]}px`;}hide(){if(this._isTransitioning||!this._isShown())return;if(P.trigger(this._element,"hide.bs.collapse").defaultPrevented)return;const t=this._getDimension();this._element.style[t]=`${this._element.getBoundingClientRect()[t]}px`,d(this._element),this._element.classList.add(ht),this._element.classList.remove(ct,lt);for(const t of this._triggerArray){const e=n(t);e&&!this._isShown(e)&&this._addAriaAndCollapsedClass([t],!1);}this._isTransitioning=!0,this._element.style[t]="",this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(ht),this._element.classList.add(ct),P.trigger(this._element,"hidden.bs.collapse");}),this._element,!0);}_isShown(t=this._element){return t.classList.contains(lt)}_configAfterMerge(t){return t.toggle=Boolean(t.toggle),t.parent=r(t.parent),t}_getDimension(){return this._element.classList.contains("collapse-horizontal")?"width":"height"}_initializeChildren(){if(!this._config.parent)return;const t=this._getFirstLevelChildren(dt);for(const e of t){const t=n(e);t&&this._addAriaAndCollapsedClass([e],this._isShown(t));}}_getFirstLevelChildren(t){const e=Q.find(":scope .collapse .collapse",this._config.parent);return Q.find(t,this._config.parent).filter((t=>!e.includes(t)))}_addAriaAndCollapsedClass(t,e){if(t.length)for(const i of t)i.classList.toggle("collapsed",!e),i.setAttribute("aria-expanded",e);}static jQueryInterface(t){const e={};return "string"==typeof t&&/show|hide/.test(t)&&(e.toggle=!1),this.each((function(){const i=pt.getOrCreateInstance(this,e);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t]();}}))}}P.on(document,"click.bs.collapse.data-api",dt,(function(t){("A"===t.target.tagName||t.delegateTarget&&"A"===t.delegateTarget.tagName)&&t.preventDefault();const e=i(this),n=Q.find(e);for(const t of n)pt.getOrCreateInstance(t,{toggle:!1}).toggle();})),g(pt);var gt="top",mt="bottom",_t="right",bt="left",vt="auto",yt=[gt,mt,_t,bt],wt="start",At="end",Et="clippingParents",Tt="viewport",Ct="popper",Ot="reference",xt=yt.reduce((function(t,e){return t.concat([e+"-"+wt,e+"-"+At])}),[]),kt=[].concat(yt,[vt]).reduce((function(t,e){return t.concat([e,e+"-"+wt,e+"-"+At])}),[]),Lt="beforeRead",Dt="read",St="afterRead",It="beforeMain",Nt="main",Pt="afterMain",jt="beforeWrite",Mt="write",Ht="afterWrite",$t=[Lt,Dt,St,It,Nt,Pt,jt,Mt,Ht];function Wt(t){return t?(t.nodeName||"").toLowerCase():null}function Bt(t){if(null==t)return window;if("[object Window]"!==t.toString()){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function Ft(t){return t instanceof Bt(t).Element||t instanceof Element}function zt(t){return t instanceof Bt(t).HTMLElement||t instanceof HTMLElement}function qt(t){return "undefined"!=typeof ShadowRoot&&(t instanceof Bt(t).ShadowRoot||t instanceof ShadowRoot)}const Rt={name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var e=t.state;Object.keys(e.elements).forEach((function(t){var i=e.styles[t]||{},n=e.attributes[t]||{},s=e.elements[t];zt(s)&&Wt(s)&&(Object.assign(s.style,i),Object.keys(n).forEach((function(t){var e=n[t];!1===e?s.removeAttribute(t):s.setAttribute(t,!0===e?"":e);})));}));},effect:function(t){var e=t.state,i={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,i.popper),e.styles=i,e.elements.arrow&&Object.assign(e.elements.arrow.style,i.arrow),function(){Object.keys(e.elements).forEach((function(t){var n=e.elements[t],s=e.attributes[t]||{},o=Object.keys(e.styles.hasOwnProperty(t)?e.styles[t]:i[t]).reduce((function(t,e){return t[e]="",t}),{});zt(n)&&Wt(n)&&(Object.assign(n.style,o),Object.keys(s).forEach((function(t){n.removeAttribute(t);})));}));}},requires:["computeStyles"]};function Vt(t){return t.split("-")[0]}var Kt=Math.max,Qt=Math.min,Xt=Math.round;function Yt(){var t=navigator.userAgentData;return null!=t&&t.brands?t.brands.map((function(t){return t.brand+"/"+t.version})).join(" "):navigator.userAgent}function Ut(){return !/^((?!chrome|android).)*safari/i.test(Yt())}function Gt(t,e,i){void 0===e&&(e=!1),void 0===i&&(i=!1);var n=t.getBoundingClientRect(),s=1,o=1;e&&zt(t)&&(s=t.offsetWidth>0&&Xt(n.width)/t.offsetWidth||1,o=t.offsetHeight>0&&Xt(n.height)/t.offsetHeight||1);var r=(Ft(t)?Bt(t):window).visualViewport,a=!Ut()&&i,l=(n.left+(a&&r?r.offsetLeft:0))/s,c=(n.top+(a&&r?r.offsetTop:0))/o,h=n.width/s,d=n.height/o;return {width:h,height:d,top:c,right:l+h,bottom:c+d,left:l,x:l,y:c}}function Jt(t){var e=Gt(t),i=t.offsetWidth,n=t.offsetHeight;return Math.abs(e.width-i)<=1&&(i=e.width),Math.abs(e.height-n)<=1&&(n=e.height),{x:t.offsetLeft,y:t.offsetTop,width:i,height:n}}function Zt(t,e){var i=e.getRootNode&&e.getRootNode();if(t.contains(e))return !0;if(i&&qt(i)){var n=e;do{if(n&&t.isSameNode(n))return !0;n=n.parentNode||n.host;}while(n)}return !1}function te(t){return Bt(t).getComputedStyle(t)}function ee(t){return ["table","td","th"].indexOf(Wt(t))>=0}function ie(t){return ((Ft(t)?t.ownerDocument:t.document)||window.document).documentElement}function ne(t){return "html"===Wt(t)?t:t.assignedSlot||t.parentNode||(qt(t)?t.host:null)||ie(t)}function se(t){return zt(t)&&"fixed"!==te(t).position?t.offsetParent:null}function oe(t){for(var e=Bt(t),i=se(t);i&&ee(i)&&"static"===te(i).position;)i=se(i);return i&&("html"===Wt(i)||"body"===Wt(i)&&"static"===te(i).position)?e:i||function(t){var e=/firefox/i.test(Yt());if(/Trident/i.test(Yt())&&zt(t)&&"fixed"===te(t).position)return null;var i=ne(t);for(qt(i)&&(i=i.host);zt(i)&&["html","body"].indexOf(Wt(i))<0;){var n=te(i);if("none"!==n.transform||"none"!==n.perspective||"paint"===n.contain||-1!==["transform","perspective"].indexOf(n.willChange)||e&&"filter"===n.willChange||e&&n.filter&&"none"!==n.filter)return i;i=i.parentNode;}return null}(t)||e}function re(t){return ["top","bottom"].indexOf(t)>=0?"x":"y"}function ae(t,e,i){return Kt(t,Qt(e,i))}function le(t){return Object.assign({},{top:0,right:0,bottom:0,left:0},t)}function ce(t,e){return e.reduce((function(e,i){return e[i]=t,e}),{})}const he={name:"arrow",enabled:!0,phase:"main",fn:function(t){var e,i=t.state,n=t.name,s=t.options,o=i.elements.arrow,r=i.modifiersData.popperOffsets,a=Vt(i.placement),l=re(a),c=[bt,_t].indexOf(a)>=0?"height":"width";if(o&&r){var h=function(t,e){return le("number"!=typeof(t="function"==typeof t?t(Object.assign({},e.rects,{placement:e.placement})):t)?t:ce(t,yt))}(s.padding,i),d=Jt(o),u="y"===l?gt:bt,f="y"===l?mt:_t,p=i.rects.reference[c]+i.rects.reference[l]-r[l]-i.rects.popper[c],g=r[l]-i.rects.reference[l],m=oe(o),_=m?"y"===l?m.clientHeight||0:m.clientWidth||0:0,b=p/2-g/2,v=h[u],y=_-d[c]-h[f],w=_/2-d[c]/2+b,A=ae(v,w,y),E=l;i.modifiersData[n]=((e={})[E]=A,e.centerOffset=A-w,e);}},effect:function(t){var e=t.state,i=t.options.element,n=void 0===i?"[data-popper-arrow]":i;null!=n&&("string"!=typeof n||(n=e.elements.popper.querySelector(n)))&&Zt(e.elements.popper,n)&&(e.elements.arrow=n);},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function de(t){return t.split("-")[1]}var ue={top:"auto",right:"auto",bottom:"auto",left:"auto"};function fe(t){var e,i=t.popper,n=t.popperRect,s=t.placement,o=t.variation,r=t.offsets,a=t.position,l=t.gpuAcceleration,c=t.adaptive,h=t.roundOffsets,d=t.isFixed,u=r.x,f=void 0===u?0:u,p=r.y,g=void 0===p?0:p,m="function"==typeof h?h({x:f,y:g}):{x:f,y:g};f=m.x,g=m.y;var _=r.hasOwnProperty("x"),b=r.hasOwnProperty("y"),v=bt,y=gt,w=window;if(c){var A=oe(i),E="clientHeight",T="clientWidth";A===Bt(i)&&"static"!==te(A=ie(i)).position&&"absolute"===a&&(E="scrollHeight",T="scrollWidth"),(s===gt||(s===bt||s===_t)&&o===At)&&(y=mt,g-=(d&&A===w&&w.visualViewport?w.visualViewport.height:A[E])-n.height,g*=l?1:-1),s!==bt&&(s!==gt&&s!==mt||o!==At)||(v=_t,f-=(d&&A===w&&w.visualViewport?w.visualViewport.width:A[T])-n.width,f*=l?1:-1);}var C,O=Object.assign({position:a},c&&ue),x=!0===h?function(t){var e=t.x,i=t.y,n=window.devicePixelRatio||1;return {x:Xt(e*n)/n||0,y:Xt(i*n)/n||0}}({x:f,y:g}):{x:f,y:g};return f=x.x,g=x.y,l?Object.assign({},O,((C={})[y]=b?"0":"",C[v]=_?"0":"",C.transform=(w.devicePixelRatio||1)<=1?"translate("+f+"px, "+g+"px)":"translate3d("+f+"px, "+g+"px, 0)",C)):Object.assign({},O,((e={})[y]=b?g+"px":"",e[v]=_?f+"px":"",e.transform="",e))}const pe={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var e=t.state,i=t.options,n=i.gpuAcceleration,s=void 0===n||n,o=i.adaptive,r=void 0===o||o,a=i.roundOffsets,l=void 0===a||a,c={placement:Vt(e.placement),variation:de(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:s,isFixed:"fixed"===e.options.strategy};null!=e.modifiersData.popperOffsets&&(e.styles.popper=Object.assign({},e.styles.popper,fe(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:r,roundOffsets:l})))),null!=e.modifiersData.arrow&&(e.styles.arrow=Object.assign({},e.styles.arrow,fe(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement});},data:{}};var ge={passive:!0};const me={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var e=t.state,i=t.instance,n=t.options,s=n.scroll,o=void 0===s||s,r=n.resize,a=void 0===r||r,l=Bt(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return o&&c.forEach((function(t){t.addEventListener("scroll",i.update,ge);})),a&&l.addEventListener("resize",i.update,ge),function(){o&&c.forEach((function(t){t.removeEventListener("scroll",i.update,ge);})),a&&l.removeEventListener("resize",i.update,ge);}},data:{}};var _e={left:"right",right:"left",bottom:"top",top:"bottom"};function be(t){return t.replace(/left|right|bottom|top/g,(function(t){return _e[t]}))}var ve={start:"end",end:"start"};function ye(t){return t.replace(/start|end/g,(function(t){return ve[t]}))}function we(t){var e=Bt(t);return {scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function Ae(t){return Gt(ie(t)).left+we(t).scrollLeft}function Ee(t){var e=te(t),i=e.overflow,n=e.overflowX,s=e.overflowY;return /auto|scroll|overlay|hidden/.test(i+s+n)}function Te(t){return ["html","body","#document"].indexOf(Wt(t))>=0?t.ownerDocument.body:zt(t)&&Ee(t)?t:Te(ne(t))}function Ce(t,e){var i;void 0===e&&(e=[]);var n=Te(t),s=n===(null==(i=t.ownerDocument)?void 0:i.body),o=Bt(n),r=s?[o].concat(o.visualViewport||[],Ee(n)?n:[]):n,a=e.concat(r);return s?a:a.concat(Ce(ne(r)))}function Oe(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function xe(t,e,i){return e===Tt?Oe(function(t,e){var i=Bt(t),n=ie(t),s=i.visualViewport,o=n.clientWidth,r=n.clientHeight,a=0,l=0;if(s){o=s.width,r=s.height;var c=Ut();(c||!c&&"fixed"===e)&&(a=s.offsetLeft,l=s.offsetTop);}return {width:o,height:r,x:a+Ae(t),y:l}}(t,i)):Ft(e)?function(t,e){var i=Gt(t,!1,"fixed"===e);return i.top=i.top+t.clientTop,i.left=i.left+t.clientLeft,i.bottom=i.top+t.clientHeight,i.right=i.left+t.clientWidth,i.width=t.clientWidth,i.height=t.clientHeight,i.x=i.left,i.y=i.top,i}(e,i):Oe(function(t){var e,i=ie(t),n=we(t),s=null==(e=t.ownerDocument)?void 0:e.body,o=Kt(i.scrollWidth,i.clientWidth,s?s.scrollWidth:0,s?s.clientWidth:0),r=Kt(i.scrollHeight,i.clientHeight,s?s.scrollHeight:0,s?s.clientHeight:0),a=-n.scrollLeft+Ae(t),l=-n.scrollTop;return "rtl"===te(s||i).direction&&(a+=Kt(i.clientWidth,s?s.clientWidth:0)-o),{width:o,height:r,x:a,y:l}}(ie(t)))}function ke(t){var e,i=t.reference,n=t.element,s=t.placement,o=s?Vt(s):null,r=s?de(s):null,a=i.x+i.width/2-n.width/2,l=i.y+i.height/2-n.height/2;switch(o){case gt:e={x:a,y:i.y-n.height};break;case mt:e={x:a,y:i.y+i.height};break;case _t:e={x:i.x+i.width,y:l};break;case bt:e={x:i.x-n.width,y:l};break;default:e={x:i.x,y:i.y};}var c=o?re(o):null;if(null!=c){var h="y"===c?"height":"width";switch(r){case wt:e[c]=e[c]-(i[h]/2-n[h]/2);break;case At:e[c]=e[c]+(i[h]/2-n[h]/2);}}return e}function Le(t,e){void 0===e&&(e={});var i=e,n=i.placement,s=void 0===n?t.placement:n,o=i.strategy,r=void 0===o?t.strategy:o,a=i.boundary,l=void 0===a?Et:a,c=i.rootBoundary,h=void 0===c?Tt:c,d=i.elementContext,u=void 0===d?Ct:d,f=i.altBoundary,p=void 0!==f&&f,g=i.padding,m=void 0===g?0:g,_=le("number"!=typeof m?m:ce(m,yt)),b=u===Ct?Ot:Ct,v=t.rects.popper,y=t.elements[p?b:u],w=function(t,e,i,n){var s="clippingParents"===e?function(t){var e=Ce(ne(t)),i=["absolute","fixed"].indexOf(te(t).position)>=0&&zt(t)?oe(t):t;return Ft(i)?e.filter((function(t){return Ft(t)&&Zt(t,i)&&"body"!==Wt(t)})):[]}(t):[].concat(e),o=[].concat(s,[i]),r=o[0],a=o.reduce((function(e,i){var s=xe(t,i,n);return e.top=Kt(s.top,e.top),e.right=Qt(s.right,e.right),e.bottom=Qt(s.bottom,e.bottom),e.left=Kt(s.left,e.left),e}),xe(t,r,n));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}(Ft(y)?y:y.contextElement||ie(t.elements.popper),l,h,r),A=Gt(t.elements.reference),E=ke({reference:A,element:v,strategy:"absolute",placement:s}),T=Oe(Object.assign({},v,E)),C=u===Ct?T:A,O={top:w.top-C.top+_.top,bottom:C.bottom-w.bottom+_.bottom,left:w.left-C.left+_.left,right:C.right-w.right+_.right},x=t.modifiersData.offset;if(u===Ct&&x){var k=x[s];Object.keys(O).forEach((function(t){var e=[_t,mt].indexOf(t)>=0?1:-1,i=[gt,mt].indexOf(t)>=0?"y":"x";O[t]+=k[i]*e;}));}return O}function De(t,e){void 0===e&&(e={});var i=e,n=i.placement,s=i.boundary,o=i.rootBoundary,r=i.padding,a=i.flipVariations,l=i.allowedAutoPlacements,c=void 0===l?kt:l,h=de(n),d=h?a?xt:xt.filter((function(t){return de(t)===h})):yt,u=d.filter((function(t){return c.indexOf(t)>=0}));0===u.length&&(u=d);var f=u.reduce((function(e,i){return e[i]=Le(t,{placement:i,boundary:s,rootBoundary:o,padding:r})[Vt(i)],e}),{});return Object.keys(f).sort((function(t,e){return f[t]-f[e]}))}const Se={name:"flip",enabled:!0,phase:"main",fn:function(t){var e=t.state,i=t.options,n=t.name;if(!e.modifiersData[n]._skip){for(var s=i.mainAxis,o=void 0===s||s,r=i.altAxis,a=void 0===r||r,l=i.fallbackPlacements,c=i.padding,h=i.boundary,d=i.rootBoundary,u=i.altBoundary,f=i.flipVariations,p=void 0===f||f,g=i.allowedAutoPlacements,m=e.options.placement,_=Vt(m),b=l||(_!==m&&p?function(t){if(Vt(t)===vt)return [];var e=be(t);return [ye(t),e,ye(e)]}(m):[be(m)]),v=[m].concat(b).reduce((function(t,i){return t.concat(Vt(i)===vt?De(e,{placement:i,boundary:h,rootBoundary:d,padding:c,flipVariations:p,allowedAutoPlacements:g}):i)}),[]),y=e.rects.reference,w=e.rects.popper,A=new Map,E=!0,T=v[0],C=0;C<v.length;C++){var O=v[C],x=Vt(O),k=de(O)===wt,L=[gt,mt].indexOf(x)>=0,D=L?"width":"height",S=Le(e,{placement:O,boundary:h,rootBoundary:d,altBoundary:u,padding:c}),I=L?k?_t:bt:k?mt:gt;y[D]>w[D]&&(I=be(I));var N=be(I),P=[];if(o&&P.push(S[x]<=0),a&&P.push(S[I]<=0,S[N]<=0),P.every((function(t){return t}))){T=O,E=!1;break}A.set(O,P);}if(E)for(var j=function(t){var e=v.find((function(e){var i=A.get(e);if(i)return i.slice(0,t).every((function(t){return t}))}));if(e)return T=e,"break"},M=p?3:1;M>0&&"break"!==j(M);M--);e.placement!==T&&(e.modifiersData[n]._skip=!0,e.placement=T,e.reset=!0);}},requiresIfExists:["offset"],data:{_skip:!1}};function Ie(t,e,i){return void 0===i&&(i={x:0,y:0}),{top:t.top-e.height-i.y,right:t.right-e.width+i.x,bottom:t.bottom-e.height+i.y,left:t.left-e.width-i.x}}function Ne(t){return [gt,_t,mt,bt].some((function(e){return t[e]>=0}))}const Pe={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(t){var e=t.state,i=t.name,n=e.rects.reference,s=e.rects.popper,o=e.modifiersData.preventOverflow,r=Le(e,{elementContext:"reference"}),a=Le(e,{altBoundary:!0}),l=Ie(r,n),c=Ie(a,s,o),h=Ne(l),d=Ne(c);e.modifiersData[i]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:h,hasPopperEscaped:d},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":h,"data-popper-escaped":d});}},je={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(t){var e=t.state,i=t.options,n=t.name,s=i.offset,o=void 0===s?[0,0]:s,r=kt.reduce((function(t,i){return t[i]=function(t,e,i){var n=Vt(t),s=[bt,gt].indexOf(n)>=0?-1:1,o="function"==typeof i?i(Object.assign({},e,{placement:t})):i,r=o[0],a=o[1];return r=r||0,a=(a||0)*s,[bt,_t].indexOf(n)>=0?{x:a,y:r}:{x:r,y:a}}(i,e.rects,o),t}),{}),a=r[e.placement],l=a.x,c=a.y;null!=e.modifiersData.popperOffsets&&(e.modifiersData.popperOffsets.x+=l,e.modifiersData.popperOffsets.y+=c),e.modifiersData[n]=r;}},Me={name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var e=t.state,i=t.name;e.modifiersData[i]=ke({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement});},data:{}},He={name:"preventOverflow",enabled:!0,phase:"main",fn:function(t){var e=t.state,i=t.options,n=t.name,s=i.mainAxis,o=void 0===s||s,r=i.altAxis,a=void 0!==r&&r,l=i.boundary,c=i.rootBoundary,h=i.altBoundary,d=i.padding,u=i.tether,f=void 0===u||u,p=i.tetherOffset,g=void 0===p?0:p,m=Le(e,{boundary:l,rootBoundary:c,padding:d,altBoundary:h}),_=Vt(e.placement),b=de(e.placement),v=!b,y=re(_),w="x"===y?"y":"x",A=e.modifiersData.popperOffsets,E=e.rects.reference,T=e.rects.popper,C="function"==typeof g?g(Object.assign({},e.rects,{placement:e.placement})):g,O="number"==typeof C?{mainAxis:C,altAxis:C}:Object.assign({mainAxis:0,altAxis:0},C),x=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,k={x:0,y:0};if(A){if(o){var L,D="y"===y?gt:bt,S="y"===y?mt:_t,I="y"===y?"height":"width",N=A[y],P=N+m[D],j=N-m[S],M=f?-T[I]/2:0,H=b===wt?E[I]:T[I],$=b===wt?-T[I]:-E[I],W=e.elements.arrow,B=f&&W?Jt(W):{width:0,height:0},F=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},z=F[D],q=F[S],R=ae(0,E[I],B[I]),V=v?E[I]/2-M-R-z-O.mainAxis:H-R-z-O.mainAxis,K=v?-E[I]/2+M+R+q+O.mainAxis:$+R+q+O.mainAxis,Q=e.elements.arrow&&oe(e.elements.arrow),X=Q?"y"===y?Q.clientTop||0:Q.clientLeft||0:0,Y=null!=(L=null==x?void 0:x[y])?L:0,U=N+K-Y,G=ae(f?Qt(P,N+V-Y-X):P,N,f?Kt(j,U):j);A[y]=G,k[y]=G-N;}if(a){var J,Z="x"===y?gt:bt,tt="x"===y?mt:_t,et=A[w],it="y"===w?"height":"width",nt=et+m[Z],st=et-m[tt],ot=-1!==[gt,bt].indexOf(_),rt=null!=(J=null==x?void 0:x[w])?J:0,at=ot?nt:et-E[it]-T[it]-rt+O.altAxis,lt=ot?et+E[it]+T[it]-rt-O.altAxis:st,ct=f&&ot?function(t,e,i){var n=ae(t,e,i);return n>i?i:n}(at,et,lt):ae(f?at:nt,et,f?lt:st);A[w]=ct,k[w]=ct-et;}e.modifiersData[n]=k;}},requiresIfExists:["offset"]};function $e(t,e,i){void 0===i&&(i=!1);var n,s,o=zt(e),r=zt(e)&&function(t){var e=t.getBoundingClientRect(),i=Xt(e.width)/t.offsetWidth||1,n=Xt(e.height)/t.offsetHeight||1;return 1!==i||1!==n}(e),a=ie(e),l=Gt(t,r,i),c={scrollLeft:0,scrollTop:0},h={x:0,y:0};return (o||!o&&!i)&&(("body"!==Wt(e)||Ee(a))&&(c=(n=e)!==Bt(n)&&zt(n)?{scrollLeft:(s=n).scrollLeft,scrollTop:s.scrollTop}:we(n)),zt(e)?((h=Gt(e,!0)).x+=e.clientLeft,h.y+=e.clientTop):a&&(h.x=Ae(a))),{x:l.left+c.scrollLeft-h.x,y:l.top+c.scrollTop-h.y,width:l.width,height:l.height}}function We(t){var e=new Map,i=new Set,n=[];function s(t){i.add(t.name),[].concat(t.requires||[],t.requiresIfExists||[]).forEach((function(t){if(!i.has(t)){var n=e.get(t);n&&s(n);}})),n.push(t);}return t.forEach((function(t){e.set(t.name,t);})),t.forEach((function(t){i.has(t.name)||s(t);})),n}var Be={placement:"bottom",modifiers:[],strategy:"absolute"};function Fe(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return !e.some((function(t){return !(t&&"function"==typeof t.getBoundingClientRect)}))}function ze(t){void 0===t&&(t={});var e=t,i=e.defaultModifiers,n=void 0===i?[]:i,s=e.defaultOptions,o=void 0===s?Be:s;return function(t,e,i){void 0===i&&(i=o);var s,r,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},Be,o),modifiersData:{},elements:{reference:t,popper:e},attributes:{},styles:{}},l=[],c=!1,h={state:a,setOptions:function(i){var s="function"==typeof i?i(a.options):i;d(),a.options=Object.assign({},o,a.options,s),a.scrollParents={reference:Ft(t)?Ce(t):t.contextElement?Ce(t.contextElement):[],popper:Ce(e)};var r,c,u=function(t){var e=We(t);return $t.reduce((function(t,i){return t.concat(e.filter((function(t){return t.phase===i})))}),[])}((r=[].concat(n,a.options.modifiers),c=r.reduce((function(t,e){var i=t[e.name];return t[e.name]=i?Object.assign({},i,e,{options:Object.assign({},i.options,e.options),data:Object.assign({},i.data,e.data)}):e,t}),{}),Object.keys(c).map((function(t){return c[t]}))));return a.orderedModifiers=u.filter((function(t){return t.enabled})),a.orderedModifiers.forEach((function(t){var e=t.name,i=t.options,n=void 0===i?{}:i,s=t.effect;if("function"==typeof s){var o=s({state:a,name:e,instance:h,options:n});l.push(o||function(){});}})),h.update()},forceUpdate:function(){if(!c){var t=a.elements,e=t.reference,i=t.popper;if(Fe(e,i)){a.rects={reference:$e(e,oe(i),"fixed"===a.options.strategy),popper:Jt(i)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(t){return a.modifiersData[t.name]=Object.assign({},t.data)}));for(var n=0;n<a.orderedModifiers.length;n++)if(!0!==a.reset){var s=a.orderedModifiers[n],o=s.fn,r=s.options,l=void 0===r?{}:r,d=s.name;"function"==typeof o&&(a=o({state:a,options:l,name:d,instance:h})||a);}else a.reset=!1,n=-1;}}},update:(s=function(){return new Promise((function(t){h.forceUpdate(),t(a);}))},function(){return r||(r=new Promise((function(t){Promise.resolve().then((function(){r=void 0,t(s());}));}))),r}),destroy:function(){d(),c=!0;}};if(!Fe(t,e))return h;function d(){l.forEach((function(t){return t()})),l=[];}return h.setOptions(i).then((function(t){!c&&i.onFirstUpdate&&i.onFirstUpdate(t);})),h}}var qe=ze(),Re=ze({defaultModifiers:[me,Me,pe,Rt]}),Ve=ze({defaultModifiers:[me,Me,pe,Rt,je,Se,He,he,Pe]});const Ke=Object.freeze(Object.defineProperty({__proto__:null,popperGenerator:ze,detectOverflow:Le,createPopperBase:qe,createPopper:Ve,createPopperLite:Re,top:gt,bottom:mt,right:_t,left:bt,auto:vt,basePlacements:yt,start:wt,end:At,clippingParents:Et,viewport:Tt,popper:Ct,reference:Ot,variationPlacements:xt,placements:kt,beforeRead:Lt,read:Dt,afterRead:St,beforeMain:It,main:Nt,afterMain:Pt,beforeWrite:jt,write:Mt,afterWrite:Ht,modifierPhases:$t,applyStyles:Rt,arrow:he,computeStyles:pe,eventListeners:me,flip:Se,hide:Pe,offset:je,popperOffsets:Me,preventOverflow:He},Symbol.toStringTag,{value:"Module"})),Qe="dropdown",Xe="ArrowUp",Ye="ArrowDown",Ue="click.bs.dropdown.data-api",Ge="keydown.bs.dropdown.data-api",Je="show",Ze='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',ti=`${Ze}.show`,ei=".dropdown-menu",ii=p()?"top-end":"top-start",ni=p()?"top-start":"top-end",si=p()?"bottom-end":"bottom-start",oi=p()?"bottom-start":"bottom-end",ri=p()?"left-start":"right-start",ai=p()?"right-start":"left-start",li={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},ci={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class hi extends z{constructor(t,e){super(t,e),this._popper=null,this._parent=this._element.parentNode,this._menu=Q.next(this._element,ei)[0]||Q.prev(this._element,ei)[0]||Q.findOne(ei,this._parent),this._inNavbar=this._detectNavbar();}static get Default(){return li}static get DefaultType(){return ci}static get NAME(){return Qe}toggle(){return this._isShown()?this.hide():this.show()}show(){if(l(this._element)||this._isShown())return;const t={relatedTarget:this._element};if(!P.trigger(this._element,"show.bs.dropdown",t).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(".navbar-nav"))for(const t of [].concat(...document.body.children))P.on(t,"mouseover",h);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(Je),this._element.classList.add(Je),P.trigger(this._element,"shown.bs.dropdown",t);}}hide(){if(l(this._element)||!this._isShown())return;const t={relatedTarget:this._element};this._completeHide(t);}dispose(){this._popper&&this._popper.destroy(),super.dispose();}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update();}_completeHide(t){if(!P.trigger(this._element,"hide.bs.dropdown",t).defaultPrevented){if("ontouchstart"in document.documentElement)for(const t of [].concat(...document.body.children))P.off(t,"mouseover",h);this._popper&&this._popper.destroy(),this._menu.classList.remove(Je),this._element.classList.remove(Je),this._element.setAttribute("aria-expanded","false"),B.removeDataAttribute(this._menu,"popper"),P.trigger(this._element,"hidden.bs.dropdown",t);}}_getConfig(t){if("object"==typeof(t=super._getConfig(t)).reference&&!o(t.reference)&&"function"!=typeof t.reference.getBoundingClientRect)throw new TypeError(`${Qe.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(){if(void 0===Ke)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let t=this._element;"parent"===this._config.reference?t=this._parent:o(this._config.reference)?t=r(this._config.reference):"object"==typeof this._config.reference&&(t=this._config.reference);const e=this._getPopperConfig();this._popper=Ve(t,this._menu,e);}_isShown(){return this._menu.classList.contains(Je)}_getPlacement(){const t=this._parent;if(t.classList.contains("dropend"))return ri;if(t.classList.contains("dropstart"))return ai;if(t.classList.contains("dropup-center"))return "top";if(t.classList.contains("dropdown-center"))return "bottom";const e="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();return t.classList.contains("dropup")?e?ni:ii:e?oi:si}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:t}=this._config;return "string"==typeof t?t.split(",").map((t=>Number.parseInt(t,10))):"function"==typeof t?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return (this._inNavbar||"static"===this._config.display)&&(B.setDataAttribute(this._menu,"popper","static"),t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,..."function"==typeof this._config.popperConfig?this._config.popperConfig(t):this._config.popperConfig}}_selectMenuItem({key:t,target:e}){const i=Q.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter((t=>a(t)));i.length&&b(i,e,t===Ye,!i.includes(e)).focus();}static jQueryInterface(t){return this.each((function(){const e=hi.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]();}}))}static clearMenus(t){if(2===t.button||"keyup"===t.type&&"Tab"!==t.key)return;const e=Q.find(ti);for(const i of e){const e=hi.getInstance(i);if(!e||!1===e._config.autoClose)continue;const n=t.composedPath(),s=n.includes(e._menu);if(n.includes(e._element)||"inside"===e._config.autoClose&&!s||"outside"===e._config.autoClose&&s)continue;if(e._menu.contains(t.target)&&("keyup"===t.type&&"Tab"===t.key||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;const o={relatedTarget:e._element};"click"===t.type&&(o.clickEvent=t),e._completeHide(o);}}static dataApiKeydownHandler(t){const e=/input|textarea/i.test(t.target.tagName),i="Escape"===t.key,n=[Xe,Ye].includes(t.key);if(!n&&!i)return;if(e&&!i)return;t.preventDefault();const s=this.matches(Ze)?this:Q.prev(this,Ze)[0]||Q.next(this,Ze)[0]||Q.findOne(Ze,t.delegateTarget.parentNode),o=hi.getOrCreateInstance(s);if(n)return t.stopPropagation(),o.show(),void o._selectMenuItem(t);o._isShown()&&(t.stopPropagation(),o.hide(),s.focus());}}P.on(document,Ge,Ze,hi.dataApiKeydownHandler),P.on(document,Ge,ei,hi.dataApiKeydownHandler),P.on(document,Ue,hi.clearMenus),P.on(document,"keyup.bs.dropdown.data-api",hi.clearMenus),P.on(document,Ue,Ze,(function(t){t.preventDefault(),hi.getOrCreateInstance(this).toggle();})),g(hi);const di=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",ui=".sticky-top",fi="padding-right",pi="margin-right";class gi{constructor(){this._element=document.body;}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,fi,(e=>e+t)),this._setElementAttributes(di,fi,(e=>e+t)),this._setElementAttributes(ui,pi,(e=>e-t));}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,fi),this._resetElementAttributes(di,fi),this._resetElementAttributes(ui,pi);}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden";}_setElementAttributes(t,e,i){const n=this.getWidth();this._applyManipulationCallback(t,(t=>{if(t!==this._element&&window.innerWidth>t.clientWidth+n)return;this._saveInitialAttribute(t,e);const s=window.getComputedStyle(t).getPropertyValue(e);t.style.setProperty(e,`${i(Number.parseFloat(s))}px`);}));}_saveInitialAttribute(t,e){const i=t.style.getPropertyValue(e);i&&B.setDataAttribute(t,e,i);}_resetElementAttributes(t,e){this._applyManipulationCallback(t,(t=>{const i=B.getDataAttribute(t,e);null!==i?(B.removeDataAttribute(t,e),t.style.setProperty(e,i)):t.style.removeProperty(e);}));}_applyManipulationCallback(t,e){if(o(t))e(t);else for(const i of Q.find(t,this._element))e(i);}}const mi="show",_i="mousedown.bs.backdrop",bi={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},vi={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class yi extends F{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null;}static get Default(){return bi}static get DefaultType(){return vi}static get NAME(){return "backdrop"}show(t){if(!this._config.isVisible)return void m(t);this._append();const e=this._getElement();this._config.isAnimated&&d(e),e.classList.add(mi),this._emulateAnimation((()=>{m(t);}));}hide(t){this._config.isVisible?(this._getElement().classList.remove(mi),this._emulateAnimation((()=>{this.dispose(),m(t);}))):m(t);}dispose(){this._isAppended&&(P.off(this._element,_i),this._element.remove(),this._isAppended=!1);}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add("fade"),this._element=t;}return this._element}_configAfterMerge(t){return t.rootElement=r(t.rootElement),t}_append(){if(this._isAppended)return;const t=this._getElement();this._config.rootElement.append(t),P.on(t,_i,(()=>{m(this._config.clickCallback);})),this._isAppended=!0;}_emulateAnimation(t){_(t,this._getElement(),this._config.isAnimated);}}const wi=".bs.focustrap",Ai="backward",Ei={autofocus:!0,trapElement:null},Ti={autofocus:"boolean",trapElement:"element"};class Ci extends F{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null;}static get Default(){return Ei}static get DefaultType(){return Ti}static get NAME(){return "focustrap"}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),P.off(document,wi),P.on(document,"focusin.bs.focustrap",(t=>this._handleFocusin(t))),P.on(document,"keydown.tab.bs.focustrap",(t=>this._handleKeydown(t))),this._isActive=!0);}deactivate(){this._isActive&&(this._isActive=!1,P.off(document,wi));}_handleFocusin(t){const{trapElement:e}=this._config;if(t.target===document||t.target===e||e.contains(t.target))return;const i=Q.focusableChildren(e);0===i.length?e.focus():this._lastTabNavDirection===Ai?i[i.length-1].focus():i[0].focus();}_handleKeydown(t){"Tab"===t.key&&(this._lastTabNavDirection=t.shiftKey?Ai:"forward");}}const Oi="hidden.bs.modal",xi="show.bs.modal",ki="modal-open",Li="show",Di="modal-static",Si={backdrop:!0,focus:!0,keyboard:!0},Ii={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class Ni extends z{constructor(t,e){super(t,e),this._dialog=Q.findOne(".modal-dialog",this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new gi,this._addEventListeners();}static get Default(){return Si}static get DefaultType(){return Ii}static get NAME(){return "modal"}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||P.trigger(this._element,xi,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(ki),this._adjustDialog(),this._backdrop.show((()=>this._showElement(t))));}hide(){this._isShown&&!this._isTransitioning&&(P.trigger(this._element,"hide.bs.modal").defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(Li),this._queueCallback((()=>this._hideModal()),this._element,this._isAnimated())));}dispose(){for(const t of [window,this._dialog])P.off(t,".bs.modal");this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose();}handleUpdate(){this._adjustDialog();}_initializeBackDrop(){return new yi({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new Ci({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=Q.findOne(".modal-body",this._dialog);e&&(e.scrollTop=0),d(this._element),this._element.classList.add(Li),this._queueCallback((()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,P.trigger(this._element,"shown.bs.modal",{relatedTarget:t});}),this._dialog,this._isAnimated());}_addEventListeners(){P.on(this._element,"keydown.dismiss.bs.modal",(t=>{if("Escape"===t.key)return this._config.keyboard?(t.preventDefault(),void this.hide()):void this._triggerBackdropTransition()})),P.on(window,"resize.bs.modal",(()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog();})),P.on(this._element,"mousedown.dismiss.bs.modal",(t=>{P.one(this._element,"click.dismiss.bs.modal",(e=>{this._element===t.target&&this._element===e.target&&("static"!==this._config.backdrop?this._config.backdrop&&this.hide():this._triggerBackdropTransition());}));}));}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide((()=>{document.body.classList.remove(ki),this._resetAdjustments(),this._scrollBar.reset(),P.trigger(this._element,Oi);}));}_isAnimated(){return this._element.classList.contains("fade")}_triggerBackdropTransition(){if(P.trigger(this._element,"hidePrevented.bs.modal").defaultPrevented)return;const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._element.style.overflowY;"hidden"===e||this._element.classList.contains(Di)||(t||(this._element.style.overflowY="hidden"),this._element.classList.add(Di),this._queueCallback((()=>{this._element.classList.remove(Di),this._queueCallback((()=>{this._element.style.overflowY=e;}),this._dialog);}),this._dialog),this._element.focus());}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),i=e>0;if(i&&!t){const t=p()?"paddingLeft":"paddingRight";this._element.style[t]=`${e}px`;}if(!i&&t){const t=p()?"paddingRight":"paddingLeft";this._element.style[t]=`${e}px`;}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight="";}static jQueryInterface(t,e){return this.each((function(){const i=Ni.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t](e);}}))}}P.on(document,"click.bs.modal.data-api",'[data-bs-toggle="modal"]',(function(t){const e=n(this);["A","AREA"].includes(this.tagName)&&t.preventDefault(),P.one(e,xi,(t=>{t.defaultPrevented||P.one(e,Oi,(()=>{a(this)&&this.focus();}));}));const i=Q.findOne(".modal.show");i&&Ni.getInstance(i).hide(),Ni.getOrCreateInstance(e).toggle(this);})),q(Ni),g(Ni);const Pi="show",ji="showing",Mi="hiding",Hi=".offcanvas.show",$i="hidePrevented.bs.offcanvas",Wi="hidden.bs.offcanvas",Bi={backdrop:!0,keyboard:!0,scroll:!1},Fi={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class zi extends z{constructor(t,e){super(t,e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners();}static get Default(){return Bi}static get DefaultType(){return Fi}static get NAME(){return "offcanvas"}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||P.trigger(this._element,"show.bs.offcanvas",{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._backdrop.show(),this._config.scroll||(new gi).hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(ji),this._queueCallback((()=>{this._config.scroll&&!this._config.backdrop||this._focustrap.activate(),this._element.classList.add(Pi),this._element.classList.remove(ji),P.trigger(this._element,"shown.bs.offcanvas",{relatedTarget:t});}),this._element,!0));}hide(){this._isShown&&(P.trigger(this._element,"hide.bs.offcanvas").defaultPrevented||(this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(Mi),this._backdrop.hide(),this._queueCallback((()=>{this._element.classList.remove(Pi,Mi),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||(new gi).reset(),P.trigger(this._element,Wi);}),this._element,!0)));}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose();}_initializeBackDrop(){const t=Boolean(this._config.backdrop);return new yi({className:"offcanvas-backdrop",isVisible:t,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:t?()=>{"static"!==this._config.backdrop?this.hide():P.trigger(this._element,$i);}:null})}_initializeFocusTrap(){return new Ci({trapElement:this._element})}_addEventListeners(){P.on(this._element,"keydown.dismiss.bs.offcanvas",(t=>{"Escape"===t.key&&(this._config.keyboard?this.hide():P.trigger(this._element,$i));}));}static jQueryInterface(t){return this.each((function(){const e=zi.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this);}}))}}P.on(document,"click.bs.offcanvas.data-api",'[data-bs-toggle="offcanvas"]',(function(t){const e=n(this);if(["A","AREA"].includes(this.tagName)&&t.preventDefault(),l(this))return;P.one(e,Wi,(()=>{a(this)&&this.focus();}));const i=Q.findOne(Hi);i&&i!==e&&zi.getInstance(i).hide(),zi.getOrCreateInstance(e).toggle(this);})),P.on(window,"load.bs.offcanvas.data-api",(()=>{for(const t of Q.find(Hi))zi.getOrCreateInstance(t).show();})),P.on(window,"resize.bs.offcanvas",(()=>{for(const t of Q.find("[aria-modal][class*=show][class*=offcanvas-]"))"fixed"!==getComputedStyle(t).position&&zi.getOrCreateInstance(t).hide();})),q(zi),g(zi);const qi=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),Ri=/^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,Vi=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,Ki=(t,e)=>{const i=t.nodeName.toLowerCase();return e.includes(i)?!qi.has(i)||Boolean(Ri.test(t.nodeValue)||Vi.test(t.nodeValue)):e.filter((t=>t instanceof RegExp)).some((t=>t.test(i)))},Qi={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},Xi={allowList:Qi,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},Yi={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},Ui={entry:"(string|element|function|null)",selector:"(string|element)"};class Gi extends F{constructor(t){super(),this._config=this._getConfig(t);}static get Default(){return Xi}static get DefaultType(){return Yi}static get NAME(){return "TemplateFactory"}getContent(){return Object.values(this._config.content).map((t=>this._resolvePossibleFunction(t))).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[e,i]of Object.entries(this._config.content))this._setContent(t,i,e);const e=t.children[0],i=this._resolvePossibleFunction(this._config.extraClass);return i&&e.classList.add(...i.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content);}_checkContent(t){for(const[e,i]of Object.entries(t))super._typeCheckConfig({selector:e,entry:i},Ui);}_setContent(t,e,i){const n=Q.findOne(i,t);n&&((e=this._resolvePossibleFunction(e))?o(e)?this._putElementInTemplate(r(e),n):this._config.html?n.innerHTML=this._maybeSanitize(e):n.textContent=e:n.remove());}_maybeSanitize(t){return this._config.sanitize?function(t,e,i){if(!t.length)return t;if(i&&"function"==typeof i)return i(t);const n=(new window.DOMParser).parseFromString(t,"text/html"),s=[].concat(...n.body.querySelectorAll("*"));for(const t of s){const i=t.nodeName.toLowerCase();if(!Object.keys(e).includes(i)){t.remove();continue}const n=[].concat(...t.attributes),s=[].concat(e["*"]||[],e[i]||[]);for(const e of n)Ki(e,s)||t.removeAttribute(e.nodeName);}return n.body.innerHTML}(t,this._config.allowList,this._config.sanitizeFn):t}_resolvePossibleFunction(t){return "function"==typeof t?t(this):t}_putElementInTemplate(t,e){if(this._config.html)return e.innerHTML="",void e.append(t);e.textContent=t.textContent;}}const Ji=new Set(["sanitize","allowList","sanitizeFn"]),Zi="fade",tn="show",en=".modal",nn="hide.bs.modal",sn="hover",on="focus",rn={AUTO:"auto",TOP:"top",RIGHT:p()?"left":"right",BOTTOM:"bottom",LEFT:p()?"right":"left"},an={allowList:Qi,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,0],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},ln={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class cn extends z{constructor(t,e){if(void 0===Ke)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(t,e),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle();}static get Default(){return an}static get DefaultType(){return ln}static get NAME(){return "tooltip"}enable(){this._isEnabled=!0;}disable(){this._isEnabled=!1;}toggleEnabled(){this._isEnabled=!this._isEnabled;}toggle(){this._isEnabled&&(this._activeTrigger.click=!this._activeTrigger.click,this._isShown()?this._leave():this._enter());}dispose(){clearTimeout(this._timeout),P.off(this._element.closest(en),nn,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose();}show(){if("none"===this._element.style.display)throw new Error("Please use show on visible elements");if(!this._isWithContent()||!this._isEnabled)return;const t=P.trigger(this._element,this.constructor.eventName("show")),e=(c(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(t.defaultPrevented||!e)return;this._disposePopper();const i=this._getTipElement();this._element.setAttribute("aria-describedby",i.getAttribute("id"));const{container:n}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(n.append(i),P.trigger(this._element,this.constructor.eventName("inserted"))),this._popper=this._createPopper(i),i.classList.add(tn),"ontouchstart"in document.documentElement)for(const t of [].concat(...document.body.children))P.on(t,"mouseover",h);this._queueCallback((()=>{P.trigger(this._element,this.constructor.eventName("shown")),!1===this._isHovered&&this._leave(),this._isHovered=!1;}),this.tip,this._isAnimated());}hide(){if(this._isShown()&&!P.trigger(this._element,this.constructor.eventName("hide")).defaultPrevented){if(this._getTipElement().classList.remove(tn),"ontouchstart"in document.documentElement)for(const t of [].concat(...document.body.children))P.off(t,"mouseover",h);this._activeTrigger.click=!1,this._activeTrigger.focus=!1,this._activeTrigger.hover=!1,this._isHovered=null,this._queueCallback((()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),P.trigger(this._element,this.constructor.eventName("hidden")));}),this.tip,this._isAnimated());}}update(){this._popper&&this._popper.update();}_isWithContent(){return Boolean(this._getTitle())}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(t){const e=this._getTemplateFactory(t).toHtml();if(!e)return null;e.classList.remove(Zi,tn),e.classList.add(`bs-${this.constructor.NAME}-auto`);const i=(t=>{do{t+=Math.floor(1e6*Math.random());}while(document.getElementById(t));return t})(this.constructor.NAME).toString();return e.setAttribute("id",i),this._isAnimated()&&e.classList.add(Zi),e}setContent(t){this._newContent=t,this._isShown()&&(this._disposePopper(),this.show());}_getTemplateFactory(t){return this._templateFactory?this._templateFactory.changeContent(t):this._templateFactory=new Gi({...this._config,content:t,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return {".tooltip-inner":this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(t){return this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(Zi)}_isShown(){return this.tip&&this.tip.classList.contains(tn)}_createPopper(t){const e="function"==typeof this._config.placement?this._config.placement.call(this,t,this._element):this._config.placement,i=rn[e.toUpperCase()];return Ve(this._element,t,this._getPopperConfig(i))}_getOffset(){const{offset:t}=this._config;return "string"==typeof t?t.split(",").map((t=>Number.parseInt(t,10))):"function"==typeof t?e=>t(e,this._element):t}_resolvePossibleFunction(t){return "function"==typeof t?t.call(this._element):t}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:t=>{this._getTipElement().setAttribute("data-popper-placement",t.state.placement);}}]};return {...e,..."function"==typeof this._config.popperConfig?this._config.popperConfig(e):this._config.popperConfig}}_setListeners(){const t=this._config.trigger.split(" ");for(const e of t)if("click"===e)P.on(this._element,this.constructor.eventName("click"),this._config.selector,(t=>{this._initializeOnDelegatedTarget(t).toggle();}));else if("manual"!==e){const t=e===sn?this.constructor.eventName("mouseenter"):this.constructor.eventName("focusin"),i=e===sn?this.constructor.eventName("mouseleave"):this.constructor.eventName("focusout");P.on(this._element,t,this._config.selector,(t=>{const e=this._initializeOnDelegatedTarget(t);e._activeTrigger["focusin"===t.type?on:sn]=!0,e._enter();})),P.on(this._element,i,this._config.selector,(t=>{const e=this._initializeOnDelegatedTarget(t);e._activeTrigger["focusout"===t.type?on:sn]=e._element.contains(t.relatedTarget),e._leave();}));}this._hideModalHandler=()=>{this._element&&this.hide();},P.on(this._element.closest(en),nn,this._hideModalHandler);}_fixTitle(){const t=this._element.getAttribute("title");t&&(this._element.getAttribute("aria-label")||this._element.textContent.trim()||this._element.setAttribute("aria-label",t),this._element.setAttribute("data-bs-original-title",t),this._element.removeAttribute("title"));}_enter(){this._isShown()||this._isHovered?this._isHovered=!0:(this._isHovered=!0,this._setTimeout((()=>{this._isHovered&&this.show();}),this._config.delay.show));}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout((()=>{this._isHovered||this.hide();}),this._config.delay.hide));}_setTimeout(t,e){clearTimeout(this._timeout),this._timeout=setTimeout(t,e);}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(t){const e=B.getDataAttributes(this._element);for(const t of Object.keys(e))Ji.has(t)&&delete e[t];return t={...e,..."object"==typeof t&&t?t:{}},t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t.container=!1===t.container?document.body:r(t.container),"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),t}_getDelegateConfig(){const t={};for(const e in this._config)this.constructor.Default[e]!==this._config[e]&&(t[e]=this._config[e]);return t.selector=!1,t.trigger="manual",t}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null);}static jQueryInterface(t){return this.each((function(){const e=cn.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]();}}))}}g(cn);const hn={...cn.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},dn={...cn.DefaultType,content:"(null|string|element|function)"};class un extends cn{static get Default(){return hn}static get DefaultType(){return dn}static get NAME(){return "popover"}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return {".popover-header":this._getTitle(),".popover-body":this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each((function(){const e=un.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]();}}))}}g(un);const fn="click.bs.scrollspy",pn="active",gn="[href]",mn={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},_n={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class bn extends z{constructor(t,e){super(t,e),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement="visible"===getComputedStyle(this._element).overflowY?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh();}static get Default(){return mn}static get DefaultType(){return _n}static get NAME(){return "scrollspy"}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const t of this._observableSections.values())this._observer.observe(t);}dispose(){this._observer.disconnect(),super.dispose();}_configAfterMerge(t){return t.target=r(t.target)||document.body,t.rootMargin=t.offset?`${t.offset}px 0px -30%`:t.rootMargin,"string"==typeof t.threshold&&(t.threshold=t.threshold.split(",").map((t=>Number.parseFloat(t)))),t}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(P.off(this._config.target,fn),P.on(this._config.target,fn,gn,(t=>{const e=this._observableSections.get(t.target.hash);if(e){t.preventDefault();const i=this._rootElement||window,n=e.offsetTop-this._element.offsetTop;if(i.scrollTo)return void i.scrollTo({top:n,behavior:"smooth"});i.scrollTop=n;}})));}_getNewObserver(){const t={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver((t=>this._observerCallback(t)),t)}_observerCallback(t){const e=t=>this._targetLinks.get(`#${t.target.id}`),i=t=>{this._previousScrollData.visibleEntryTop=t.target.offsetTop,this._process(e(t));},n=(this._rootElement||document.documentElement).scrollTop,s=n>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=n;for(const o of t){if(!o.isIntersecting){this._activeTarget=null,this._clearActiveClass(e(o));continue}const t=o.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(s&&t){if(i(o),!n)return}else s||t||i(o);}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const t=Q.find(gn,this._config.target);for(const e of t){if(!e.hash||l(e))continue;const t=Q.findOne(e.hash,this._element);a(t)&&(this._targetLinks.set(e.hash,e),this._observableSections.set(e.hash,t));}}_process(t){this._activeTarget!==t&&(this._clearActiveClass(this._config.target),this._activeTarget=t,t.classList.add(pn),this._activateParents(t),P.trigger(this._element,"activate.bs.scrollspy",{relatedTarget:t}));}_activateParents(t){if(t.classList.contains("dropdown-item"))Q.findOne(".dropdown-toggle",t.closest(".dropdown")).classList.add(pn);else for(const e of Q.parents(t,".nav, .list-group"))for(const t of Q.prev(e,".nav-link, .nav-item > .nav-link, .list-group-item"))t.classList.add(pn);}_clearActiveClass(t){t.classList.remove(pn);const e=Q.find("[href].active",t);for(const t of e)t.classList.remove(pn);}static jQueryInterface(t){return this.each((function(){const e=bn.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t]();}}))}}P.on(window,"load.bs.scrollspy.data-api",(()=>{for(const t of Q.find('[data-bs-spy="scroll"]'))bn.getOrCreateInstance(t);})),g(bn);const vn="ArrowLeft",yn="ArrowRight",wn="ArrowUp",An="ArrowDown",En="active",Tn="fade",Cn="show",On='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',xn=`.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ${On}`;class kn extends z{constructor(t){super(t),this._parent=this._element.closest('.list-group, .nav, [role="tablist"]'),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),P.on(this._element,"keydown.bs.tab",(t=>this._keydown(t))));}static get NAME(){return "tab"}show(){const t=this._element;if(this._elemIsActive(t))return;const e=this._getActiveElem(),i=e?P.trigger(e,"hide.bs.tab",{relatedTarget:t}):null;P.trigger(t,"show.bs.tab",{relatedTarget:e}).defaultPrevented||i&&i.defaultPrevented||(this._deactivate(e,t),this._activate(t,e));}_activate(t,e){t&&(t.classList.add(En),this._activate(n(t)),this._queueCallback((()=>{"tab"===t.getAttribute("role")?(t.removeAttribute("tabindex"),t.setAttribute("aria-selected",!0),this._toggleDropDown(t,!0),P.trigger(t,"shown.bs.tab",{relatedTarget:e})):t.classList.add(Cn);}),t,t.classList.contains(Tn)));}_deactivate(t,e){t&&(t.classList.remove(En),t.blur(),this._deactivate(n(t)),this._queueCallback((()=>{"tab"===t.getAttribute("role")?(t.setAttribute("aria-selected",!1),t.setAttribute("tabindex","-1"),this._toggleDropDown(t,!1),P.trigger(t,"hidden.bs.tab",{relatedTarget:e})):t.classList.remove(Cn);}),t,t.classList.contains(Tn)));}_keydown(t){if(![vn,yn,wn,An].includes(t.key))return;t.stopPropagation(),t.preventDefault();const e=[yn,An].includes(t.key),i=b(this._getChildren().filter((t=>!l(t))),t.target,e,!0);i&&(i.focus({preventScroll:!0}),kn.getOrCreateInstance(i).show());}_getChildren(){return Q.find(xn,this._parent)}_getActiveElem(){return this._getChildren().find((t=>this._elemIsActive(t)))||null}_setInitialAttributes(t,e){this._setAttributeIfNotExists(t,"role","tablist");for(const t of e)this._setInitialAttributesOnChild(t);}_setInitialAttributesOnChild(t){t=this._getInnerElement(t);const e=this._elemIsActive(t),i=this._getOuterElement(t);t.setAttribute("aria-selected",e),i!==t&&this._setAttributeIfNotExists(i,"role","presentation"),e||t.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(t,"role","tab"),this._setInitialAttributesOnTargetPanel(t);}_setInitialAttributesOnTargetPanel(t){const e=n(t);e&&(this._setAttributeIfNotExists(e,"role","tabpanel"),t.id&&this._setAttributeIfNotExists(e,"aria-labelledby",`#${t.id}`));}_toggleDropDown(t,e){const i=this._getOuterElement(t);if(!i.classList.contains("dropdown"))return;const n=(t,n)=>{const s=Q.findOne(t,i);s&&s.classList.toggle(n,e);};n(".dropdown-toggle",En),n(".dropdown-menu",Cn),i.setAttribute("aria-expanded",e);}_setAttributeIfNotExists(t,e,i){t.hasAttribute(e)||t.setAttribute(e,i);}_elemIsActive(t){return t.classList.contains(En)}_getInnerElement(t){return t.matches(xn)?t:Q.findOne(xn,t)}_getOuterElement(t){return t.closest(".nav-item, .list-group-item")||t}static jQueryInterface(t){return this.each((function(){const e=kn.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t]();}}))}}P.on(document,"click.bs.tab",On,(function(t){["A","AREA"].includes(this.tagName)&&t.preventDefault(),l(this)||kn.getOrCreateInstance(this).show();})),P.on(window,"load.bs.tab",(()=>{for(const t of Q.find('.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]'))kn.getOrCreateInstance(t);})),g(kn);const Ln="hide",Dn="show",Sn="showing",In={animation:"boolean",autohide:"boolean",delay:"number"},Nn={animation:!0,autohide:!0,delay:5e3};class Pn extends z{constructor(t,e){super(t,e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners();}static get Default(){return Nn}static get DefaultType(){return In}static get NAME(){return "toast"}show(){P.trigger(this._element,"show.bs.toast").defaultPrevented||(this._clearTimeout(),this._config.animation&&this._element.classList.add("fade"),this._element.classList.remove(Ln),d(this._element),this._element.classList.add(Dn,Sn),this._queueCallback((()=>{this._element.classList.remove(Sn),P.trigger(this._element,"shown.bs.toast"),this._maybeScheduleHide();}),this._element,this._config.animation));}hide(){this.isShown()&&(P.trigger(this._element,"hide.bs.toast").defaultPrevented||(this._element.classList.add(Sn),this._queueCallback((()=>{this._element.classList.add(Ln),this._element.classList.remove(Sn,Dn),P.trigger(this._element,"hidden.bs.toast");}),this._element,this._config.animation)));}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(Dn),super.dispose();}isShown(){return this._element.classList.contains(Dn)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout((()=>{this.hide();}),this._config.delay)));}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":this._hasMouseInteraction=e;break;case"focusin":case"focusout":this._hasKeyboardInteraction=e;}if(e)return void this._clearTimeout();const i=t.relatedTarget;this._element===i||this._element.contains(i)||this._maybeScheduleHide();}_setListeners(){P.on(this._element,"mouseover.bs.toast",(t=>this._onInteraction(t,!0))),P.on(this._element,"mouseout.bs.toast",(t=>this._onInteraction(t,!1))),P.on(this._element,"focusin.bs.toast",(t=>this._onInteraction(t,!0))),P.on(this._element,"focusout.bs.toast",(t=>this._onInteraction(t,!1)));}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null;}static jQueryInterface(t){return this.each((function(){const e=Pn.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t](this);}}))}}return q(Pn),g(Pn),{Alert:R,Button:K,Carousel:at,Collapse:pt,Dropdown:hi,Modal:Ni,Offcanvas:zi,Popover:un,ScrollSpy:bn,Tab:kn,Toast:Pn,Tooltip:cn}}));
    	
    } (bootstrap_bundle_min));

    function toInteger(dirtyNumber) {
      if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
        return NaN;
      }

      var number = Number(dirtyNumber);

      if (isNaN(number)) {
        return number;
      }

      return number < 0 ? Math.ceil(number) : Math.floor(number);
    }

    function requiredArgs(required, args) {
      if (args.length < required) {
        throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
      }
    }

    function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }
    /**
     * @name toDate
     * @category Common Helpers
     * @summary Convert the given argument to an instance of Date.
     *
     * @description
     * Convert the given argument to an instance of Date.
     *
     * If the argument is an instance of Date, the function returns its clone.
     *
     * If the argument is a number, it is treated as a timestamp.
     *
     * If the argument is none of the above, the function returns Invalid Date.
     *
     * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
     *
     * @param {Date|Number} argument - the value to convert
     * @returns {Date} the parsed date in the local time zone
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // Clone the date:
     * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
     * //=> Tue Feb 11 2014 11:30:30
     *
     * @example
     * // Convert the timestamp to date:
     * const result = toDate(1392098430000)
     * //=> Tue Feb 11 2014 11:30:30
     */

    function toDate(argument) {
      requiredArgs(1, arguments);
      var argStr = Object.prototype.toString.call(argument); // Clone the date

      if (argument instanceof Date || _typeof$1(argument) === 'object' && argStr === '[object Date]') {
        // Prevent the date to lose the milliseconds when passed to new Date() in IE10
        return new Date(argument.getTime());
      } else if (typeof argument === 'number' || argStr === '[object Number]') {
        return new Date(argument);
      } else {
        if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
          // eslint-disable-next-line no-console
          console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console

          console.warn(new Error().stack);
        }

        return new Date(NaN);
      }
    }

    /**
     * @name addMilliseconds
     * @category Millisecond Helpers
     * @summary Add the specified number of milliseconds to the given date.
     *
     * @description
     * Add the specified number of milliseconds to the given date.
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the milliseconds added
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
     * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
     * //=> Thu Jul 10 2014 12:45:30.750
     */

    function addMilliseconds(dirtyDate, dirtyAmount) {
      requiredArgs(2, arguments);
      var timestamp = toDate(dirtyDate).getTime();
      var amount = toInteger(dirtyAmount);
      return new Date(timestamp + amount);
    }

    var defaultOptions = {};
    function getDefaultOptions() {
      return defaultOptions;
    }

    /**
     * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
     * They usually appear for dates that denote time before the timezones were introduced
     * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
     * and GMT+01:00:00 after that date)
     *
     * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
     * which would lead to incorrect calculations.
     *
     * This function returns the timezone offset in milliseconds that takes seconds in account.
     */
    function getTimezoneOffsetInMilliseconds(date) {
      var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
      utcDate.setUTCFullYear(date.getFullYear());
      return date.getTime() - utcDate.getTime();
    }

    function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    /**
     * @name isDate
     * @category Common Helpers
     * @summary Is the given value a date?
     *
     * @description
     * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
     *
     * @param {*} value - the value to check
     * @returns {boolean} true if the given value is a date
     * @throws {TypeError} 1 arguments required
     *
     * @example
     * // For a valid date:
     * const result = isDate(new Date())
     * //=> true
     *
     * @example
     * // For an invalid date:
     * const result = isDate(new Date(NaN))
     * //=> true
     *
     * @example
     * // For some value:
     * const result = isDate('2014-02-31')
     * //=> false
     *
     * @example
     * // For an object:
     * const result = isDate({})
     * //=> false
     */

    function isDate(value) {
      requiredArgs(1, arguments);
      return value instanceof Date || _typeof(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
    }

    /**
     * @name isValid
     * @category Common Helpers
     * @summary Is the given date valid?
     *
     * @description
     * Returns false if argument is Invalid Date and true otherwise.
     * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
     * Invalid Date is a Date, whose time value is NaN.
     *
     * Time value of Date: http://es5.github.io/#x15.9.1.1
     *
     * @param {*} date - the date to check
     * @returns {Boolean} the date is valid
     * @throws {TypeError} 1 argument required
     *
     * @example
     * // For the valid date:
     * const result = isValid(new Date(2014, 1, 31))
     * //=> true
     *
     * @example
     * // For the value, convertable into a date:
     * const result = isValid(1393804800000)
     * //=> true
     *
     * @example
     * // For the invalid date:
     * const result = isValid(new Date(''))
     * //=> false
     */

    function isValid(dirtyDate) {
      requiredArgs(1, arguments);

      if (!isDate(dirtyDate) && typeof dirtyDate !== 'number') {
        return false;
      }

      var date = toDate(dirtyDate);
      return !isNaN(Number(date));
    }

    /**
     * @name subMilliseconds
     * @category Millisecond Helpers
     * @summary Subtract the specified number of milliseconds from the given date.
     *
     * @description
     * Subtract the specified number of milliseconds from the given date.
     *
     * @param {Date|Number} date - the date to be changed
     * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
     * @returns {Date} the new date with the milliseconds subtracted
     * @throws {TypeError} 2 arguments required
     *
     * @example
     * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
     * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
     * //=> Thu Jul 10 2014 12:45:29.250
     */

    function subMilliseconds(dirtyDate, dirtyAmount) {
      requiredArgs(2, arguments);
      var amount = toInteger(dirtyAmount);
      return addMilliseconds(dirtyDate, -amount);
    }

    var MILLISECONDS_IN_DAY = 86400000;
    function getUTCDayOfYear(dirtyDate) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var timestamp = date.getTime();
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
      var startOfYearTimestamp = date.getTime();
      var difference = timestamp - startOfYearTimestamp;
      return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
    }

    function startOfUTCISOWeek(dirtyDate) {
      requiredArgs(1, arguments);
      var weekStartsOn = 1;
      var date = toDate(dirtyDate);
      var day = date.getUTCDay();
      var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      date.setUTCDate(date.getUTCDate() - diff);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }

    function getUTCISOWeekYear(dirtyDate) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var year = date.getUTCFullYear();
      var fourthOfJanuaryOfNextYear = new Date(0);
      fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
      fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
      var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
      var fourthOfJanuaryOfThisYear = new Date(0);
      fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
      fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
      var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);

      if (date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }

    function startOfUTCISOWeekYear(dirtyDate) {
      requiredArgs(1, arguments);
      var year = getUTCISOWeekYear(dirtyDate);
      var fourthOfJanuary = new Date(0);
      fourthOfJanuary.setUTCFullYear(year, 0, 4);
      fourthOfJanuary.setUTCHours(0, 0, 0, 0);
      var date = startOfUTCISOWeek(fourthOfJanuary);
      return date;
    }

    var MILLISECONDS_IN_WEEK$1 = 604800000;
    function getUTCISOWeek(dirtyDate) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime(); // Round the number of days to the nearest integer
      // because the number of milliseconds in a week is not constant
      // (e.g. it's different in the week of the daylight saving time clock shift)

      return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
    }

    function startOfUTCWeek(dirtyDate, options) {
      var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;

      requiredArgs(1, arguments);
      var defaultOptions = getDefaultOptions();
      var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
      }

      var date = toDate(dirtyDate);
      var day = date.getUTCDay();
      var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      date.setUTCDate(date.getUTCDate() - diff);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }

    function getUTCWeekYear(dirtyDate, options) {
      var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;

      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var year = date.getUTCFullYear();
      var defaultOptions = getDefaultOptions();
      var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

      if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
        throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
      }

      var firstWeekOfNextYear = new Date(0);
      firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
      firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
      var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
      var firstWeekOfThisYear = new Date(0);
      firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
      firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
      var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);

      if (date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }

    function startOfUTCWeekYear(dirtyDate, options) {
      var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;

      requiredArgs(1, arguments);
      var defaultOptions = getDefaultOptions();
      var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
      var year = getUTCWeekYear(dirtyDate, options);
      var firstWeek = new Date(0);
      firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
      firstWeek.setUTCHours(0, 0, 0, 0);
      var date = startOfUTCWeek(firstWeek, options);
      return date;
    }

    var MILLISECONDS_IN_WEEK = 604800000;
    function getUTCWeek(dirtyDate, options) {
      requiredArgs(1, arguments);
      var date = toDate(dirtyDate);
      var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime(); // Round the number of days to the nearest integer
      // because the number of milliseconds in a week is not constant
      // (e.g. it's different in the week of the daylight saving time clock shift)

      return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
    }

    function addLeadingZeros(number, targetLength) {
      var sign = number < 0 ? '-' : '';
      var output = Math.abs(number).toString();

      while (output.length < targetLength) {
        output = '0' + output;
      }

      return sign + output;
    }

    /*
     * |     | Unit                           |     | Unit                           |
     * |-----|--------------------------------|-----|--------------------------------|
     * |  a  | AM, PM                         |  A* |                                |
     * |  d  | Day of month                   |  D  |                                |
     * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
     * |  m  | Minute                         |  M  | Month                          |
     * |  s  | Second                         |  S  | Fraction of second             |
     * |  y  | Year (abs)                     |  Y  |                                |
     *
     * Letters marked by * are not implemented but reserved by Unicode standard.
     */

    var formatters$2 = {
      // Year
      y: function y(date, token) {
        // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
        // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
        // |----------|-------|----|-------|-------|-------|
        // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
        // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
        // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
        // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
        // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
        var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return addLeadingZeros(token === 'yy' ? year % 100 : year, token.length);
      },
      // Month
      M: function M(date, token) {
        var month = date.getUTCMonth();
        return token === 'M' ? String(month + 1) : addLeadingZeros(month + 1, 2);
      },
      // Day of the month
      d: function d(date, token) {
        return addLeadingZeros(date.getUTCDate(), token.length);
      },
      // AM or PM
      a: function a(date, token) {
        var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';

        switch (token) {
          case 'a':
          case 'aa':
            return dayPeriodEnumValue.toUpperCase();

          case 'aaa':
            return dayPeriodEnumValue;

          case 'aaaaa':
            return dayPeriodEnumValue[0];

          case 'aaaa':
          default:
            return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
        }
      },
      // Hour [1-12]
      h: function h(date, token) {
        return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
      },
      // Hour [0-23]
      H: function H(date, token) {
        return addLeadingZeros(date.getUTCHours(), token.length);
      },
      // Minute
      m: function m(date, token) {
        return addLeadingZeros(date.getUTCMinutes(), token.length);
      },
      // Second
      s: function s(date, token) {
        return addLeadingZeros(date.getUTCSeconds(), token.length);
      },
      // Fraction of second
      S: function S(date, token) {
        var numberOfDigits = token.length;
        var milliseconds = date.getUTCMilliseconds();
        var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
        return addLeadingZeros(fractionalSeconds, token.length);
      }
    };
    var formatters$3 = formatters$2;

    var dayPeriodEnum = {
      am: 'am',
      pm: 'pm',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    };

    /*
     * |     | Unit                           |     | Unit                           |
     * |-----|--------------------------------|-----|--------------------------------|
     * |  a  | AM, PM                         |  A* | Milliseconds in day            |
     * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
     * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
     * |  d  | Day of month                   |  D  | Day of year                    |
     * |  e  | Local day of week              |  E  | Day of week                    |
     * |  f  |                                |  F* | Day of week in month           |
     * |  g* | Modified Julian day            |  G  | Era                            |
     * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
     * |  i! | ISO day of week                |  I! | ISO week of year               |
     * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
     * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
     * |  l* | (deprecated)                   |  L  | Stand-alone month              |
     * |  m  | Minute                         |  M  | Month                          |
     * |  n  |                                |  N  |                                |
     * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
     * |  p! | Long localized time            |  P! | Long localized date            |
     * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
     * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
     * |  s  | Second                         |  S  | Fraction of second             |
     * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
     * |  u  | Extended year                  |  U* | Cyclic year                    |
     * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
     * |  w  | Local week of year             |  W* | Week of month                  |
     * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
     * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
     * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
     *
     * Letters marked by * are not implemented but reserved by Unicode standard.
     *
     * Letters marked by ! are non-standard, but implemented by date-fns:
     * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
     * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
     *   i.e. 7 for Sunday, 1 for Monday, etc.
     * - `I` is ISO week of year, as opposed to `w` which is local week of year.
     * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
     *   `R` is supposed to be used in conjunction with `I` and `i`
     *   for universal ISO week-numbering date, whereas
     *   `Y` is supposed to be used in conjunction with `w` and `e`
     *   for week-numbering date specific to the locale.
     * - `P` is long localized date format
     * - `p` is long localized time format
     */
    var formatters = {
      // Era
      G: function G(date, token, localize) {
        var era = date.getUTCFullYear() > 0 ? 1 : 0;

        switch (token) {
          // AD, BC
          case 'G':
          case 'GG':
          case 'GGG':
            return localize.era(era, {
              width: 'abbreviated'
            });
          // A, B

          case 'GGGGG':
            return localize.era(era, {
              width: 'narrow'
            });
          // Anno Domini, Before Christ

          case 'GGGG':
          default:
            return localize.era(era, {
              width: 'wide'
            });
        }
      },
      // Year
      y: function y(date, token, localize) {
        // Ordinal number
        if (token === 'yo') {
          var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

          var year = signedYear > 0 ? signedYear : 1 - signedYear;
          return localize.ordinalNumber(year, {
            unit: 'year'
          });
        }

        return formatters$3.y(date, token);
      },
      // Local week-numbering year
      Y: function Y(date, token, localize, options) {
        var signedWeekYear = getUTCWeekYear(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)

        var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year

        if (token === 'YY') {
          var twoDigitYear = weekYear % 100;
          return addLeadingZeros(twoDigitYear, 2);
        } // Ordinal number


        if (token === 'Yo') {
          return localize.ordinalNumber(weekYear, {
            unit: 'year'
          });
        } // Padding


        return addLeadingZeros(weekYear, token.length);
      },
      // ISO week-numbering year
      R: function R(date, token) {
        var isoWeekYear = getUTCISOWeekYear(date); // Padding

        return addLeadingZeros(isoWeekYear, token.length);
      },
      // Extended year. This is a single number designating the year of this calendar system.
      // The main difference between `y` and `u` localizers are B.C. years:
      // | Year | `y` | `u` |
      // |------|-----|-----|
      // | AC 1 |   1 |   1 |
      // | BC 1 |   1 |   0 |
      // | BC 2 |   2 |  -1 |
      // Also `yy` always returns the last two digits of a year,
      // while `uu` pads single digit years to 2 characters and returns other years unchanged.
      u: function u(date, token) {
        var year = date.getUTCFullYear();
        return addLeadingZeros(year, token.length);
      },
      // Quarter
      Q: function Q(date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

        switch (token) {
          // 1, 2, 3, 4
          case 'Q':
            return String(quarter);
          // 01, 02, 03, 04

          case 'QQ':
            return addLeadingZeros(quarter, 2);
          // 1st, 2nd, 3rd, 4th

          case 'Qo':
            return localize.ordinalNumber(quarter, {
              unit: 'quarter'
            });
          // Q1, Q2, Q3, Q4

          case 'QQQ':
            return localize.quarter(quarter, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)

          case 'QQQQQ':
            return localize.quarter(quarter, {
              width: 'narrow',
              context: 'formatting'
            });
          // 1st quarter, 2nd quarter, ...

          case 'QQQQ':
          default:
            return localize.quarter(quarter, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Stand-alone quarter
      q: function q(date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

        switch (token) {
          // 1, 2, 3, 4
          case 'q':
            return String(quarter);
          // 01, 02, 03, 04

          case 'qq':
            return addLeadingZeros(quarter, 2);
          // 1st, 2nd, 3rd, 4th

          case 'qo':
            return localize.ordinalNumber(quarter, {
              unit: 'quarter'
            });
          // Q1, Q2, Q3, Q4

          case 'qqq':
            return localize.quarter(quarter, {
              width: 'abbreviated',
              context: 'standalone'
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)

          case 'qqqqq':
            return localize.quarter(quarter, {
              width: 'narrow',
              context: 'standalone'
            });
          // 1st quarter, 2nd quarter, ...

          case 'qqqq':
          default:
            return localize.quarter(quarter, {
              width: 'wide',
              context: 'standalone'
            });
        }
      },
      // Month
      M: function M(date, token, localize) {
        var month = date.getUTCMonth();

        switch (token) {
          case 'M':
          case 'MM':
            return formatters$3.M(date, token);
          // 1st, 2nd, ..., 12th

          case 'Mo':
            return localize.ordinalNumber(month + 1, {
              unit: 'month'
            });
          // Jan, Feb, ..., Dec

          case 'MMM':
            return localize.month(month, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // J, F, ..., D

          case 'MMMMM':
            return localize.month(month, {
              width: 'narrow',
              context: 'formatting'
            });
          // January, February, ..., December

          case 'MMMM':
          default:
            return localize.month(month, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Stand-alone month
      L: function L(date, token, localize) {
        var month = date.getUTCMonth();

        switch (token) {
          // 1, 2, ..., 12
          case 'L':
            return String(month + 1);
          // 01, 02, ..., 12

          case 'LL':
            return addLeadingZeros(month + 1, 2);
          // 1st, 2nd, ..., 12th

          case 'Lo':
            return localize.ordinalNumber(month + 1, {
              unit: 'month'
            });
          // Jan, Feb, ..., Dec

          case 'LLL':
            return localize.month(month, {
              width: 'abbreviated',
              context: 'standalone'
            });
          // J, F, ..., D

          case 'LLLLL':
            return localize.month(month, {
              width: 'narrow',
              context: 'standalone'
            });
          // January, February, ..., December

          case 'LLLL':
          default:
            return localize.month(month, {
              width: 'wide',
              context: 'standalone'
            });
        }
      },
      // Local week of year
      w: function w(date, token, localize, options) {
        var week = getUTCWeek(date, options);

        if (token === 'wo') {
          return localize.ordinalNumber(week, {
            unit: 'week'
          });
        }

        return addLeadingZeros(week, token.length);
      },
      // ISO week of year
      I: function I(date, token, localize) {
        var isoWeek = getUTCISOWeek(date);

        if (token === 'Io') {
          return localize.ordinalNumber(isoWeek, {
            unit: 'week'
          });
        }

        return addLeadingZeros(isoWeek, token.length);
      },
      // Day of the month
      d: function d(date, token, localize) {
        if (token === 'do') {
          return localize.ordinalNumber(date.getUTCDate(), {
            unit: 'date'
          });
        }

        return formatters$3.d(date, token);
      },
      // Day of year
      D: function D(date, token, localize) {
        var dayOfYear = getUTCDayOfYear(date);

        if (token === 'Do') {
          return localize.ordinalNumber(dayOfYear, {
            unit: 'dayOfYear'
          });
        }

        return addLeadingZeros(dayOfYear, token.length);
      },
      // Day of week
      E: function E(date, token, localize) {
        var dayOfWeek = date.getUTCDay();

        switch (token) {
          // Tue
          case 'E':
          case 'EE':
          case 'EEE':
            return localize.day(dayOfWeek, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // T

          case 'EEEEE':
            return localize.day(dayOfWeek, {
              width: 'narrow',
              context: 'formatting'
            });
          // Tu

          case 'EEEEEE':
            return localize.day(dayOfWeek, {
              width: 'short',
              context: 'formatting'
            });
          // Tuesday

          case 'EEEE':
          default:
            return localize.day(dayOfWeek, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Local day of week
      e: function e(date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

        switch (token) {
          // Numerical value (Nth day of week with current locale or weekStartsOn)
          case 'e':
            return String(localDayOfWeek);
          // Padded numerical value

          case 'ee':
            return addLeadingZeros(localDayOfWeek, 2);
          // 1st, 2nd, ..., 7th

          case 'eo':
            return localize.ordinalNumber(localDayOfWeek, {
              unit: 'day'
            });

          case 'eee':
            return localize.day(dayOfWeek, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // T

          case 'eeeee':
            return localize.day(dayOfWeek, {
              width: 'narrow',
              context: 'formatting'
            });
          // Tu

          case 'eeeeee':
            return localize.day(dayOfWeek, {
              width: 'short',
              context: 'formatting'
            });
          // Tuesday

          case 'eeee':
          default:
            return localize.day(dayOfWeek, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Stand-alone local day of week
      c: function c(date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

        switch (token) {
          // Numerical value (same as in `e`)
          case 'c':
            return String(localDayOfWeek);
          // Padded numerical value

          case 'cc':
            return addLeadingZeros(localDayOfWeek, token.length);
          // 1st, 2nd, ..., 7th

          case 'co':
            return localize.ordinalNumber(localDayOfWeek, {
              unit: 'day'
            });

          case 'ccc':
            return localize.day(dayOfWeek, {
              width: 'abbreviated',
              context: 'standalone'
            });
          // T

          case 'ccccc':
            return localize.day(dayOfWeek, {
              width: 'narrow',
              context: 'standalone'
            });
          // Tu

          case 'cccccc':
            return localize.day(dayOfWeek, {
              width: 'short',
              context: 'standalone'
            });
          // Tuesday

          case 'cccc':
          default:
            return localize.day(dayOfWeek, {
              width: 'wide',
              context: 'standalone'
            });
        }
      },
      // ISO day of week
      i: function i(date, token, localize) {
        var dayOfWeek = date.getUTCDay();
        var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

        switch (token) {
          // 2
          case 'i':
            return String(isoDayOfWeek);
          // 02

          case 'ii':
            return addLeadingZeros(isoDayOfWeek, token.length);
          // 2nd

          case 'io':
            return localize.ordinalNumber(isoDayOfWeek, {
              unit: 'day'
            });
          // Tue

          case 'iii':
            return localize.day(dayOfWeek, {
              width: 'abbreviated',
              context: 'formatting'
            });
          // T

          case 'iiiii':
            return localize.day(dayOfWeek, {
              width: 'narrow',
              context: 'formatting'
            });
          // Tu

          case 'iiiiii':
            return localize.day(dayOfWeek, {
              width: 'short',
              context: 'formatting'
            });
          // Tuesday

          case 'iiii':
          default:
            return localize.day(dayOfWeek, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // AM or PM
      a: function a(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';

        switch (token) {
          case 'a':
          case 'aa':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            });

          case 'aaa':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            }).toLowerCase();

          case 'aaaaa':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'narrow',
              context: 'formatting'
            });

          case 'aaaa':
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // AM, PM, midnight, noon
      b: function b(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;

        if (hours === 12) {
          dayPeriodEnumValue = dayPeriodEnum.noon;
        } else if (hours === 0) {
          dayPeriodEnumValue = dayPeriodEnum.midnight;
        } else {
          dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
        }

        switch (token) {
          case 'b':
          case 'bb':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            });

          case 'bbb':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            }).toLowerCase();

          case 'bbbbb':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'narrow',
              context: 'formatting'
            });

          case 'bbbb':
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // in the morning, in the afternoon, in the evening, at night
      B: function B(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;

        if (hours >= 17) {
          dayPeriodEnumValue = dayPeriodEnum.evening;
        } else if (hours >= 12) {
          dayPeriodEnumValue = dayPeriodEnum.afternoon;
        } else if (hours >= 4) {
          dayPeriodEnumValue = dayPeriodEnum.morning;
        } else {
          dayPeriodEnumValue = dayPeriodEnum.night;
        }

        switch (token) {
          case 'B':
          case 'BB':
          case 'BBB':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting'
            });

          case 'BBBBB':
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'narrow',
              context: 'formatting'
            });

          case 'BBBB':
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: 'wide',
              context: 'formatting'
            });
        }
      },
      // Hour [1-12]
      h: function h(date, token, localize) {
        if (token === 'ho') {
          var hours = date.getUTCHours() % 12;
          if (hours === 0) hours = 12;
          return localize.ordinalNumber(hours, {
            unit: 'hour'
          });
        }

        return formatters$3.h(date, token);
      },
      // Hour [0-23]
      H: function H(date, token, localize) {
        if (token === 'Ho') {
          return localize.ordinalNumber(date.getUTCHours(), {
            unit: 'hour'
          });
        }

        return formatters$3.H(date, token);
      },
      // Hour [0-11]
      K: function K(date, token, localize) {
        var hours = date.getUTCHours() % 12;

        if (token === 'Ko') {
          return localize.ordinalNumber(hours, {
            unit: 'hour'
          });
        }

        return addLeadingZeros(hours, token.length);
      },
      // Hour [1-24]
      k: function k(date, token, localize) {
        var hours = date.getUTCHours();
        if (hours === 0) hours = 24;

        if (token === 'ko') {
          return localize.ordinalNumber(hours, {
            unit: 'hour'
          });
        }

        return addLeadingZeros(hours, token.length);
      },
      // Minute
      m: function m(date, token, localize) {
        if (token === 'mo') {
          return localize.ordinalNumber(date.getUTCMinutes(), {
            unit: 'minute'
          });
        }

        return formatters$3.m(date, token);
      },
      // Second
      s: function s(date, token, localize) {
        if (token === 'so') {
          return localize.ordinalNumber(date.getUTCSeconds(), {
            unit: 'second'
          });
        }

        return formatters$3.s(date, token);
      },
      // Fraction of second
      S: function S(date, token) {
        return formatters$3.S(date, token);
      },
      // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
      X: function X(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();

        if (timezoneOffset === 0) {
          return 'Z';
        }

        switch (token) {
          // Hours and optional minutes
          case 'X':
            return formatTimezoneWithOptionalMinutes(timezoneOffset);
          // Hours, minutes and optional seconds without `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `XX`

          case 'XXXX':
          case 'XX':
            // Hours and minutes without `:` delimiter
            return formatTimezone(timezoneOffset);
          // Hours, minutes and optional seconds with `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `XXX`

          case 'XXXXX':
          case 'XXX': // Hours and minutes with `:` delimiter

          default:
            return formatTimezone(timezoneOffset, ':');
        }
      },
      // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
      x: function x(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();

        switch (token) {
          // Hours and optional minutes
          case 'x':
            return formatTimezoneWithOptionalMinutes(timezoneOffset);
          // Hours, minutes and optional seconds without `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `xx`

          case 'xxxx':
          case 'xx':
            // Hours and minutes without `:` delimiter
            return formatTimezone(timezoneOffset);
          // Hours, minutes and optional seconds with `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `xxx`

          case 'xxxxx':
          case 'xxx': // Hours and minutes with `:` delimiter

          default:
            return formatTimezone(timezoneOffset, ':');
        }
      },
      // Timezone (GMT)
      O: function O(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();

        switch (token) {
          // Short
          case 'O':
          case 'OO':
          case 'OOO':
            return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
          // Long

          case 'OOOO':
          default:
            return 'GMT' + formatTimezone(timezoneOffset, ':');
        }
      },
      // Timezone (specific non-location)
      z: function z(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();

        switch (token) {
          // Short
          case 'z':
          case 'zz':
          case 'zzz':
            return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
          // Long

          case 'zzzz':
          default:
            return 'GMT' + formatTimezone(timezoneOffset, ':');
        }
      },
      // Seconds timestamp
      t: function t(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = Math.floor(originalDate.getTime() / 1000);
        return addLeadingZeros(timestamp, token.length);
      },
      // Milliseconds timestamp
      T: function T(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = originalDate.getTime();
        return addLeadingZeros(timestamp, token.length);
      }
    };

    function formatTimezoneShort(offset, dirtyDelimiter) {
      var sign = offset > 0 ? '-' : '+';
      var absOffset = Math.abs(offset);
      var hours = Math.floor(absOffset / 60);
      var minutes = absOffset % 60;

      if (minutes === 0) {
        return sign + String(hours);
      }

      var delimiter = dirtyDelimiter || '';
      return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
    }

    function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
      if (offset % 60 === 0) {
        var sign = offset > 0 ? '-' : '+';
        return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
      }

      return formatTimezone(offset, dirtyDelimiter);
    }

    function formatTimezone(offset, dirtyDelimiter) {
      var delimiter = dirtyDelimiter || '';
      var sign = offset > 0 ? '-' : '+';
      var absOffset = Math.abs(offset);
      var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
      var minutes = addLeadingZeros(absOffset % 60, 2);
      return sign + hours + delimiter + minutes;
    }

    var formatters$1 = formatters;

    var dateLongFormatter = function dateLongFormatter(pattern, formatLong) {
      switch (pattern) {
        case 'P':
          return formatLong.date({
            width: 'short'
          });

        case 'PP':
          return formatLong.date({
            width: 'medium'
          });

        case 'PPP':
          return formatLong.date({
            width: 'long'
          });

        case 'PPPP':
        default:
          return formatLong.date({
            width: 'full'
          });
      }
    };

    var timeLongFormatter = function timeLongFormatter(pattern, formatLong) {
      switch (pattern) {
        case 'p':
          return formatLong.time({
            width: 'short'
          });

        case 'pp':
          return formatLong.time({
            width: 'medium'
          });

        case 'ppp':
          return formatLong.time({
            width: 'long'
          });

        case 'pppp':
        default:
          return formatLong.time({
            width: 'full'
          });
      }
    };

    var dateTimeLongFormatter = function dateTimeLongFormatter(pattern, formatLong) {
      var matchResult = pattern.match(/(P+)(p+)?/) || [];
      var datePattern = matchResult[1];
      var timePattern = matchResult[2];

      if (!timePattern) {
        return dateLongFormatter(pattern, formatLong);
      }

      var dateTimeFormat;

      switch (datePattern) {
        case 'P':
          dateTimeFormat = formatLong.dateTime({
            width: 'short'
          });
          break;

        case 'PP':
          dateTimeFormat = formatLong.dateTime({
            width: 'medium'
          });
          break;

        case 'PPP':
          dateTimeFormat = formatLong.dateTime({
            width: 'long'
          });
          break;

        case 'PPPP':
        default:
          dateTimeFormat = formatLong.dateTime({
            width: 'full'
          });
          break;
      }

      return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
    };

    var longFormatters = {
      p: timeLongFormatter,
      P: dateTimeLongFormatter
    };
    var longFormatters$1 = longFormatters;

    var protectedDayOfYearTokens = ['D', 'DD'];
    var protectedWeekYearTokens = ['YY', 'YYYY'];
    function isProtectedDayOfYearToken(token) {
      return protectedDayOfYearTokens.indexOf(token) !== -1;
    }
    function isProtectedWeekYearToken(token) {
      return protectedWeekYearTokens.indexOf(token) !== -1;
    }
    function throwProtectedError(token, format, input) {
      if (token === 'YYYY') {
        throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
      } else if (token === 'YY') {
        throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
      } else if (token === 'D') {
        throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
      } else if (token === 'DD') {
        throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
      }
    }

    var formatDistanceLocale = {
      lessThanXSeconds: {
        one: 'less than a second',
        other: 'less than {{count}} seconds'
      },
      xSeconds: {
        one: '1 second',
        other: '{{count}} seconds'
      },
      halfAMinute: 'half a minute',
      lessThanXMinutes: {
        one: 'less than a minute',
        other: 'less than {{count}} minutes'
      },
      xMinutes: {
        one: '1 minute',
        other: '{{count}} minutes'
      },
      aboutXHours: {
        one: 'about 1 hour',
        other: 'about {{count}} hours'
      },
      xHours: {
        one: '1 hour',
        other: '{{count}} hours'
      },
      xDays: {
        one: '1 day',
        other: '{{count}} days'
      },
      aboutXWeeks: {
        one: 'about 1 week',
        other: 'about {{count}} weeks'
      },
      xWeeks: {
        one: '1 week',
        other: '{{count}} weeks'
      },
      aboutXMonths: {
        one: 'about 1 month',
        other: 'about {{count}} months'
      },
      xMonths: {
        one: '1 month',
        other: '{{count}} months'
      },
      aboutXYears: {
        one: 'about 1 year',
        other: 'about {{count}} years'
      },
      xYears: {
        one: '1 year',
        other: '{{count}} years'
      },
      overXYears: {
        one: 'over 1 year',
        other: 'over {{count}} years'
      },
      almostXYears: {
        one: 'almost 1 year',
        other: 'almost {{count}} years'
      }
    };

    var formatDistance = function formatDistance(token, count, options) {
      var result;
      var tokenValue = formatDistanceLocale[token];

      if (typeof tokenValue === 'string') {
        result = tokenValue;
      } else if (count === 1) {
        result = tokenValue.one;
      } else {
        result = tokenValue.other.replace('{{count}}', count.toString());
      }

      if (options !== null && options !== void 0 && options.addSuffix) {
        if (options.comparison && options.comparison > 0) {
          return 'in ' + result;
        } else {
          return result + ' ago';
        }
      }

      return result;
    };

    var formatDistance$1 = formatDistance;

    function buildFormatLongFn(args) {
      return function () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // TODO: Remove String()
        var width = options.width ? String(options.width) : args.defaultWidth;
        var format = args.formats[width] || args.formats[args.defaultWidth];
        return format;
      };
    }

    var dateFormats = {
      full: 'EEEE, MMMM do, y',
      long: 'MMMM do, y',
      medium: 'MMM d, y',
      short: 'MM/dd/yyyy'
    };
    var timeFormats = {
      full: 'h:mm:ss a zzzz',
      long: 'h:mm:ss a z',
      medium: 'h:mm:ss a',
      short: 'h:mm a'
    };
    var dateTimeFormats = {
      full: "{{date}} 'at' {{time}}",
      long: "{{date}} 'at' {{time}}",
      medium: '{{date}}, {{time}}',
      short: '{{date}}, {{time}}'
    };
    var formatLong = {
      date: buildFormatLongFn({
        formats: dateFormats,
        defaultWidth: 'full'
      }),
      time: buildFormatLongFn({
        formats: timeFormats,
        defaultWidth: 'full'
      }),
      dateTime: buildFormatLongFn({
        formats: dateTimeFormats,
        defaultWidth: 'full'
      })
    };
    var formatLong$1 = formatLong;

    var formatRelativeLocale = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: 'P'
    };

    var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
      return formatRelativeLocale[token];
    };

    var formatRelative$1 = formatRelative;

    function buildLocalizeFn(args) {
      return function (dirtyIndex, options) {
        var context = options !== null && options !== void 0 && options.context ? String(options.context) : 'standalone';
        var valuesArray;

        if (context === 'formatting' && args.formattingValues) {
          var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
          var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
          valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
        } else {
          var _defaultWidth = args.defaultWidth;

          var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;

          valuesArray = args.values[_width] || args.values[_defaultWidth];
        }

        var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex; // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!

        return valuesArray[index];
      };
    }

    var eraValues = {
      narrow: ['B', 'A'],
      abbreviated: ['BC', 'AD'],
      wide: ['Before Christ', 'Anno Domini']
    };
    var quarterValues = {
      narrow: ['1', '2', '3', '4'],
      abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
      wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
    }; // Note: in English, the names of days of the week and months are capitalized.
    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
    // Generally, formatted dates should look like they are in the middle of a sentence,
    // e.g. in Spanish language the weekdays and months should be in the lowercase.

    var monthValues = {
      narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
    var dayValues = {
      narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };
    var dayPeriodValues = {
      narrow: {
        am: 'a',
        pm: 'p',
        midnight: 'mi',
        noon: 'n',
        morning: 'morning',
        afternoon: 'afternoon',
        evening: 'evening',
        night: 'night'
      },
      abbreviated: {
        am: 'AM',
        pm: 'PM',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'morning',
        afternoon: 'afternoon',
        evening: 'evening',
        night: 'night'
      },
      wide: {
        am: 'a.m.',
        pm: 'p.m.',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'morning',
        afternoon: 'afternoon',
        evening: 'evening',
        night: 'night'
      }
    };
    var formattingDayPeriodValues = {
      narrow: {
        am: 'a',
        pm: 'p',
        midnight: 'mi',
        noon: 'n',
        morning: 'in the morning',
        afternoon: 'in the afternoon',
        evening: 'in the evening',
        night: 'at night'
      },
      abbreviated: {
        am: 'AM',
        pm: 'PM',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'in the morning',
        afternoon: 'in the afternoon',
        evening: 'in the evening',
        night: 'at night'
      },
      wide: {
        am: 'a.m.',
        pm: 'p.m.',
        midnight: 'midnight',
        noon: 'noon',
        morning: 'in the morning',
        afternoon: 'in the afternoon',
        evening: 'in the evening',
        night: 'at night'
      }
    };

    var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
      var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
      // if they are different for different grammatical genders,
      // use `options.unit`.
      //
      // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
      // 'day', 'hour', 'minute', 'second'.

      var rem100 = number % 100;

      if (rem100 > 20 || rem100 < 10) {
        switch (rem100 % 10) {
          case 1:
            return number + 'st';

          case 2:
            return number + 'nd';

          case 3:
            return number + 'rd';
        }
      }

      return number + 'th';
    };

    var localize = {
      ordinalNumber: ordinalNumber,
      era: buildLocalizeFn({
        values: eraValues,
        defaultWidth: 'wide'
      }),
      quarter: buildLocalizeFn({
        values: quarterValues,
        defaultWidth: 'wide',
        argumentCallback: function argumentCallback(quarter) {
          return quarter - 1;
        }
      }),
      month: buildLocalizeFn({
        values: monthValues,
        defaultWidth: 'wide'
      }),
      day: buildLocalizeFn({
        values: dayValues,
        defaultWidth: 'wide'
      }),
      dayPeriod: buildLocalizeFn({
        values: dayPeriodValues,
        defaultWidth: 'wide',
        formattingValues: formattingDayPeriodValues,
        defaultFormattingWidth: 'wide'
      })
    };
    var localize$1 = localize;

    function buildMatchFn(args) {
      return function (string) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var width = options.width;
        var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
        var matchResult = string.match(matchPattern);

        if (!matchResult) {
          return null;
        }

        var matchedString = matchResult[0];
        var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
        var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        }) : findKey(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        });
        var value;
        value = args.valueCallback ? args.valueCallback(key) : key;
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
          value: value,
          rest: rest
        };
      };
    }

    function findKey(object, predicate) {
      for (var key in object) {
        if (object.hasOwnProperty(key) && predicate(object[key])) {
          return key;
        }
      }

      return undefined;
    }

    function findIndex(array, predicate) {
      for (var key = 0; key < array.length; key++) {
        if (predicate(array[key])) {
          return key;
        }
      }

      return undefined;
    }

    function buildMatchPatternFn(args) {
      return function (string) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var matchResult = string.match(args.matchPattern);
        if (!matchResult) return null;
        var matchedString = matchResult[0];
        var parseResult = string.match(args.parsePattern);
        if (!parseResult) return null;
        var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
          value: value,
          rest: rest
        };
      };
    }

    var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
    var parseOrdinalNumberPattern = /\d+/i;
    var matchEraPatterns = {
      narrow: /^(b|a)/i,
      abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
      wide: /^(before christ|before common era|anno domini|common era)/i
    };
    var parseEraPatterns = {
      any: [/^b/i, /^(a|c)/i]
    };
    var matchQuarterPatterns = {
      narrow: /^[1234]/i,
      abbreviated: /^q[1234]/i,
      wide: /^[1234](th|st|nd|rd)? quarter/i
    };
    var parseQuarterPatterns = {
      any: [/1/i, /2/i, /3/i, /4/i]
    };
    var matchMonthPatterns = {
      narrow: /^[jfmasond]/i,
      abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
      wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
    };
    var parseMonthPatterns = {
      narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
      any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    };
    var matchDayPatterns = {
      narrow: /^[smtwf]/i,
      short: /^(su|mo|tu|we|th|fr|sa)/i,
      abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
      wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
    };
    var parseDayPatterns = {
      narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
      any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
    };
    var matchDayPeriodPatterns = {
      narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
      any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
    };
    var parseDayPeriodPatterns = {
      any: {
        am: /^a/i,
        pm: /^p/i,
        midnight: /^mi/i,
        noon: /^no/i,
        morning: /morning/i,
        afternoon: /afternoon/i,
        evening: /evening/i,
        night: /night/i
      }
    };
    var match = {
      ordinalNumber: buildMatchPatternFn({
        matchPattern: matchOrdinalNumberPattern,
        parsePattern: parseOrdinalNumberPattern,
        valueCallback: function valueCallback(value) {
          return parseInt(value, 10);
        }
      }),
      era: buildMatchFn({
        matchPatterns: matchEraPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseEraPatterns,
        defaultParseWidth: 'any'
      }),
      quarter: buildMatchFn({
        matchPatterns: matchQuarterPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseQuarterPatterns,
        defaultParseWidth: 'any',
        valueCallback: function valueCallback(index) {
          return index + 1;
        }
      }),
      month: buildMatchFn({
        matchPatterns: matchMonthPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseMonthPatterns,
        defaultParseWidth: 'any'
      }),
      day: buildMatchFn({
        matchPatterns: matchDayPatterns,
        defaultMatchWidth: 'wide',
        parsePatterns: parseDayPatterns,
        defaultParseWidth: 'any'
      }),
      dayPeriod: buildMatchFn({
        matchPatterns: matchDayPeriodPatterns,
        defaultMatchWidth: 'any',
        parsePatterns: parseDayPeriodPatterns,
        defaultParseWidth: 'any'
      })
    };
    var match$1 = match;

    /**
     * @type {Locale}
     * @category Locales
     * @summary English locale (United States).
     * @language English
     * @iso-639-2 eng
     * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
     * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
     */
    var locale = {
      code: 'en-US',
      formatDistance: formatDistance$1,
      formatLong: formatLong$1,
      formatRelative: formatRelative$1,
      localize: localize$1,
      match: match$1,
      options: {
        weekStartsOn: 0
        /* Sunday */
        ,
        firstWeekContainsDate: 1
      }
    };
    var defaultLocale = locale;

    // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
    //   (one of the certain letters followed by `o`)
    // - (\w)\1* matches any sequences of the same letter
    // - '' matches two quote characters in a row
    // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
    //   except a single quote symbol, which ends the sequence.
    //   Two quote characters do not end the sequence.
    //   If there is no matching single quote
    //   then the sequence will continue until the end of the string.
    // - . matches any single character unmatched by previous parts of the RegExps

    var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
    // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

    var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
    var escapedStringRegExp = /^'([^]*?)'?$/;
    var doubleQuoteRegExp = /''/g;
    var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
    /**
     * @name format
     * @category Common Helpers
     * @summary Format the date.
     *
     * @description
     * Return the formatted date string in the given format. The result may vary by locale.
     *
     * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
     * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * The characters wrapped between two single quotes characters (') are escaped.
     * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
     * (see the last example)
     *
     * Format of the string is based on Unicode Technical Standard #35:
     * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     * with a few additions (see note 7 below the table).
     *
     * Accepted patterns:
     * | Unit                            | Pattern | Result examples                   | Notes |
     * |---------------------------------|---------|-----------------------------------|-------|
     * | Era                             | G..GGG  | AD, BC                            |       |
     * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
     * |                                 | GGGGG   | A, B                              |       |
     * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
     * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
     * |                                 | yy      | 44, 01, 00, 17                    | 5     |
     * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
     * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
     * |                                 | yyyyy   | ...                               | 3,5   |
     * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
     * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
     * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
     * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
     * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
     * |                                 | YYYYY   | ...                               | 3,5   |
     * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
     * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
     * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
     * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
     * |                                 | RRRRR   | ...                               | 3,5,7 |
     * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
     * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
     * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
     * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
     * |                                 | uuuuu   | ...                               | 3,5   |
     * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
     * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
     * |                                 | QQ      | 01, 02, 03, 04                    |       |
     * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
     * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
     * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
     * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
     * |                                 | qq      | 01, 02, 03, 04                    |       |
     * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
     * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
     * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
     * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
     * |                                 | MM      | 01, 02, ..., 12                   |       |
     * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
     * |                                 | MMMM    | January, February, ..., December  | 2     |
     * |                                 | MMMMM   | J, F, ..., D                      |       |
     * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
     * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
     * |                                 | LL      | 01, 02, ..., 12                   |       |
     * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
     * |                                 | LLLL    | January, February, ..., December  | 2     |
     * |                                 | LLLLL   | J, F, ..., D                      |       |
     * | Local week of year              | w       | 1, 2, ..., 53                     |       |
     * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
     * |                                 | ww      | 01, 02, ..., 53                   |       |
     * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
     * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
     * |                                 | II      | 01, 02, ..., 53                   | 7     |
     * | Day of month                    | d       | 1, 2, ..., 31                     |       |
     * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
     * |                                 | dd      | 01, 02, ..., 31                   |       |
     * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
     * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
     * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
     * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
     * |                                 | DDDD    | ...                               | 3     |
     * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
     * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
     * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
     * |                                 | ii      | 01, 02, ..., 07                   | 7     |
     * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
     * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
     * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
     * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
     * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
     * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
     * |                                 | ee      | 02, 03, ..., 01                   |       |
     * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
     * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
     * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
     * |                                 | cc      | 02, 03, ..., 01                   |       |
     * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
     * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | AM, PM                          | a..aa   | AM, PM                            |       |
     * |                                 | aaa     | am, pm                            |       |
     * |                                 | aaaa    | a.m., p.m.                        | 2     |
     * |                                 | aaaaa   | a, p                              |       |
     * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
     * |                                 | bbb     | am, pm, noon, midnight            |       |
     * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
     * |                                 | bbbbb   | a, p, n, mi                       |       |
     * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
     * |                                 | BBBB    | at night, in the morning, ...     | 2     |
     * |                                 | BBBBB   | at night, in the morning, ...     |       |
     * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
     * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
     * |                                 | hh      | 01, 02, ..., 11, 12               |       |
     * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
     * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
     * |                                 | HH      | 00, 01, 02, ..., 23               |       |
     * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
     * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
     * |                                 | KK      | 01, 02, ..., 11, 00               |       |
     * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
     * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
     * |                                 | kk      | 24, 01, 02, ..., 23               |       |
     * | Minute                          | m       | 0, 1, ..., 59                     |       |
     * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
     * |                                 | mm      | 00, 01, ..., 59                   |       |
     * | Second                          | s       | 0, 1, ..., 59                     |       |
     * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
     * |                                 | ss      | 00, 01, ..., 59                   |       |
     * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
     * |                                 | SS      | 00, 01, ..., 99                   |       |
     * |                                 | SSS     | 000, 001, ..., 999                |       |
     * |                                 | SSSS    | ...                               | 3     |
     * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
     * |                                 | XX      | -0800, +0530, Z                   |       |
     * |                                 | XXX     | -08:00, +05:30, Z                 |       |
     * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
     * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
     * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
     * |                                 | xx      | -0800, +0530, +0000               |       |
     * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
     * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
     * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
     * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
     * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
     * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
     * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
     * | Seconds timestamp               | t       | 512969520                         | 7     |
     * |                                 | tt      | ...                               | 3,7   |
     * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
     * |                                 | TT      | ...                               | 3,7   |
     * | Long localized date             | P       | 04/29/1453                        | 7     |
     * |                                 | PP      | Apr 29, 1453                      | 7     |
     * |                                 | PPP     | April 29th, 1453                  | 7     |
     * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
     * | Long localized time             | p       | 12:00 AM                          | 7     |
     * |                                 | pp      | 12:00:00 AM                       | 7     |
     * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
     * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
     * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
     * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
     * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
     * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
     * Notes:
     * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
     *    are the same as "stand-alone" units, but are different in some languages.
     *    "Formatting" units are declined according to the rules of the language
     *    in the context of a date. "Stand-alone" units are always nominative singular:
     *
     *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
     *
     *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
     *
     * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
     *    the single quote characters (see below).
     *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
     *    the output will be the same as default pattern for this unit, usually
     *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
     *    are marked with "2" in the last column of the table.
     *
     *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
     *
     * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
     *    The output will be padded with zeros to match the length of the pattern.
     *
     *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
     *
     * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
     *    These tokens represent the shortest form of the quarter.
     *
     * 5. The main difference between `y` and `u` patterns are B.C. years:
     *
     *    | Year | `y` | `u` |
     *    |------|-----|-----|
     *    | AC 1 |   1 |   1 |
     *    | BC 1 |   1 |   0 |
     *    | BC 2 |   2 |  -1 |
     *
     *    Also `yy` always returns the last two digits of a year,
     *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
     *
     *    | Year | `yy` | `uu` |
     *    |------|------|------|
     *    | 1    |   01 |   01 |
     *    | 14   |   14 |   14 |
     *    | 376  |   76 |  376 |
     *    | 1453 |   53 | 1453 |
     *
     *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
     *    except local week-numbering years are dependent on `options.weekStartsOn`
     *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
     *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
     *
     * 6. Specific non-location timezones are currently unavailable in `date-fns`,
     *    so right now these tokens fall back to GMT timezones.
     *
     * 7. These patterns are not in the Unicode Technical Standard #35:
     *    - `i`: ISO day of week
     *    - `I`: ISO week of year
     *    - `R`: ISO week-numbering year
     *    - `t`: seconds timestamp
     *    - `T`: milliseconds timestamp
     *    - `o`: ordinal number modifier
     *    - `P`: long localized date
     *    - `p`: long localized time
     *
     * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
     *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
     *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * @param {Date|Number} date - the original date
     * @param {String} format - the string of tokens
     * @param {Object} [options] - an object with options.
     * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
     * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
     * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
     * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
     *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
     *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @returns {String} the formatted date string
     * @throws {TypeError} 2 arguments required
     * @throws {RangeError} `date` must not be Invalid Date
     * @throws {RangeError} `options.locale` must contain `localize` property
     * @throws {RangeError} `options.locale` must contain `formatLong` property
     * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
     * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
     * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws {RangeError} format string contains an unescaped latin alphabet character
     *
     * @example
     * // Represent 11 February 2014 in middle-endian format:
     * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
     * //=> '02/11/2014'
     *
     * @example
     * // Represent 2 July 2014 in Esperanto:
     * import { eoLocale } from 'date-fns/locale/eo'
     * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
     *   locale: eoLocale
     * })
     * //=> '2-a de julio 2014'
     *
     * @example
     * // Escape string by single quote characters:
     * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
     * //=> "3 o'clock"
     */

    function format(dirtyDate, dirtyFormatStr, options) {
      var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;

      requiredArgs(2, arguments);
      var formatStr = String(dirtyFormatStr);
      var defaultOptions = getDefaultOptions();
      var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : defaultLocale;
      var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

      if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
        throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
      }

      var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
      }

      if (!locale.localize) {
        throw new RangeError('locale must contain localize property');
      }

      if (!locale.formatLong) {
        throw new RangeError('locale must contain formatLong property');
      }

      var originalDate = toDate(dirtyDate);

      if (!isValid(originalDate)) {
        throw new RangeError('Invalid time value');
      } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
      // This ensures that when UTC functions will be implemented, locales will be compatible with them.
      // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376


      var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
      var utcDate = subMilliseconds(originalDate, timezoneOffset);
      var formatterOptions = {
        firstWeekContainsDate: firstWeekContainsDate,
        weekStartsOn: weekStartsOn,
        locale: locale,
        _originalDate: originalDate
      };
      var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
        var firstCharacter = substring[0];

        if (firstCharacter === 'p' || firstCharacter === 'P') {
          var longFormatter = longFormatters$1[firstCharacter];
          return longFormatter(substring, locale.formatLong);
        }

        return substring;
      }).join('').match(formattingTokensRegExp).map(function (substring) {
        // Replace two single quote characters with one single quote character
        if (substring === "''") {
          return "'";
        }

        var firstCharacter = substring[0];

        if (firstCharacter === "'") {
          return cleanEscapedString(substring);
        }

        var formatter = formatters$1[firstCharacter];

        if (formatter) {
          if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) {
            throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
          }

          if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) {
            throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
          }

          return formatter(utcDate, substring, locale.localize, formatterOptions);
        }

        if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
          throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
        }

        return substring;
      }).join('');
      return result;
    }

    function cleanEscapedString(input) {
      var matched = input.match(escapedStringRegExp);

      if (!matched) {
        return input;
      }

      return matched[1].replace(doubleQuoteRegExp, "'");
    }

    /* src/routes/DashboardScreen.svelte generated by Svelte v3.58.0 */

    const { console: console_1 } = globals;
    const file$2 = "src/routes/DashboardScreen.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (362:22) {#if answer.question == question.id}
    function create_if_block_3(ctx) {
    	let li;
    	let div;
    	let t0_value = /*answer*/ ctx[7].answer + "";
    	let t0;
    	let t1;
    	let hr;

    	const block = {
    		c: function create() {
    			li = element("li");
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			hr = element("hr");
    			attr_dev(div, "class", "accordion-body opacity-8 svelte-rah6gm");
    			add_location(div, file$2, 363, 26, 10805);
    			attr_dev(li, "class", "svelte-rah6gm");
    			add_location(li, file$2, 362, 24, 10774);
    			attr_dev(hr, "class", "svelte-rah6gm");
    			add_location(hr, file$2, 367, 24, 10975);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, div);
    			append_dev(div, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, hr, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*answersArray*/ 32 && t0_value !== (t0_value = /*answer*/ ctx[7].answer + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(hr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(362:22) {#if answer.question == question.id}",
    		ctx
    	});

    	return block;
    }

    // (361:20) {#each answersArray as answer}
    function create_each_block_1(ctx) {
    	let if_block_anchor;
    	let if_block = /*answer*/ ctx[7].question == /*question*/ ctx[6].id && create_if_block_3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*answer*/ ctx[7].question == /*question*/ ctx[6].id) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_3(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(361:20) {#each answersArray as answer}",
    		ctx
    	});

    	return block;
    }

    // (301:12) {#each questionsArray.slice().reverse() as question}
    function create_each_block$1(ctx) {
    	let div7;
    	let h5;
    	let button;
    	let t0_value = /*question*/ ctx[6].question + "";
    	let t0;
    	let button_data_bs_target_value;
    	let button_aria_controls_value;
    	let t1;
    	let div5;
    	let div0;
    	let span0;
    	let t2;
    	let t3_value = format(new Date(/*question*/ ctx[6].updated_at), "dd/mm/yyyy hh:ii") + "";
    	let t3;
    	let t4;
    	let span1;
    	let t5_value = /*countAnswersQuestion*/ ctx[17](/*question*/ ctx[6].id) + "";
    	let t5;
    	let t6;
    	let t7;
    	let div4;
    	let div1;
    	let i0;
    	let t8;
    	let div2;
    	let i1;
    	let t9;
    	let div3;
    	let i2;
    	let h5_id_value;
    	let t10;
    	let div6;
    	let ol;
    	let div6_id_value;
    	let div6_aria_labelledby_value;
    	let t11;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*answersArray*/ ctx[5];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			h5 = element("h5");
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			div5 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			t2 = text("Publiée le ");
    			t3 = text(t3_value);
    			t4 = space();
    			span1 = element("span");
    			t5 = text(t5_value);
    			t6 = text(" Réponse(s)");
    			t7 = space();
    			div4 = element("div");
    			div1 = element("div");
    			i0 = element("i");
    			t8 = space();
    			div2 = element("div");
    			i1 = element("i");
    			t9 = space();
    			div3 = element("div");
    			i2 = element("i");
    			t10 = space();
    			div6 = element("div");
    			ol = element("ol");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t11 = space();
    			attr_dev(button, "class", "accordion-button border-bottom font-weight-bold svelte-rah6gm");
    			attr_dev(button, "type", "button");
    			attr_dev(button, "data-bs-toggle", "collapse");
    			attr_dev(button, "data-bs-target", button_data_bs_target_value = "#collapse" + /*question*/ ctx[6].id);
    			attr_dev(button, "aria-expanded", "true");
    			attr_dev(button, "aria-controls", button_aria_controls_value = "collapse" + /*question*/ ctx[6].id);
    			add_location(button, file$2, 303, 18, 8181);
    			attr_dev(span0, "class", "svelte-rah6gm");
    			add_location(span0, file$2, 315, 22, 8713);
    			attr_dev(span1, "class", "svelte-rah6gm");
    			add_location(span1, file$2, 321, 22, 8945);
    			attr_dev(div0, "class", "answerCountDiv svelte-rah6gm");
    			add_location(div0, file$2, 314, 20, 8662);
    			attr_dev(i0, "class", "fa-solid fa-trash svelte-rah6gm");
    			add_location(i0, file$2, 326, 24, 9168);
    			attr_dev(div1, "class", "deleteBtn svelte-rah6gm");
    			add_location(div1, file$2, 325, 22, 9120);
    			attr_dev(i1, "class", "fa-solid fa-pen-nib svelte-rah6gm");
    			attr_dev(i1, "data-bs-toggle", "modal");
    			attr_dev(i1, "data-bs-target", "#exampleModal");
    			add_location(i1, file$2, 333, 24, 9479);
    			attr_dev(div2, "class", "editBtn svelte-rah6gm");
    			add_location(div2, file$2, 332, 22, 9433);
    			attr_dev(i2, "data-bs-toggle", "modal");
    			attr_dev(i2, "data-bs-target", "#answerModal");
    			attr_dev(i2, "class", "fa-solid fa-reply svelte-rah6gm");
    			add_location(i2, file$2, 342, 24, 9924);
    			attr_dev(div3, "class", "answerBtn svelte-rah6gm");
    			add_location(div3, file$2, 341, 22, 9876);
    			attr_dev(div4, "class", "flexBtns svelte-rah6gm");
    			add_location(div4, file$2, 324, 20, 9075);
    			attr_dev(div5, "class", "gridAnswersHeader svelte-rah6gm");
    			add_location(div5, file$2, 313, 18, 8610);
    			attr_dev(h5, "class", "accordion-header");
    			attr_dev(h5, "id", h5_id_value = "heading" + /*question*/ ctx[6].id);
    			add_location(h5, file$2, 302, 16, 8107);
    			add_location(ol, file$2, 359, 18, 10635);
    			attr_dev(div6, "id", div6_id_value = "collapse" + /*question*/ ctx[6].id);
    			attr_dev(div6, "class", "accordion-collapse collapse");
    			attr_dev(div6, "aria-labelledby", div6_aria_labelledby_value = "heading" + /*question*/ ctx[6].id);
    			attr_dev(div6, "data-bs-parent", "#accordionRental");
    			add_location(div6, file$2, 353, 16, 10386);
    			attr_dev(div7, "class", "accordion-item mb-3");
    			add_location(div7, file$2, 301, 14, 8057);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, h5);
    			append_dev(h5, button);
    			append_dev(button, t0);
    			append_dev(h5, t1);
    			append_dev(h5, div5);
    			append_dev(div5, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t2);
    			append_dev(span0, t3);
    			append_dev(div0, t4);
    			append_dev(div0, span1);
    			append_dev(span1, t5);
    			append_dev(span1, t6);
    			append_dev(div5, t7);
    			append_dev(div5, div4);
    			append_dev(div4, div1);
    			append_dev(div1, i0);
    			append_dev(div4, t8);
    			append_dev(div4, div2);
    			append_dev(div2, i1);
    			append_dev(div4, t9);
    			append_dev(div4, div3);
    			append_dev(div3, i2);
    			append_dev(div7, t10);
    			append_dev(div7, div6);
    			append_dev(div6, ol);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ol, null);
    				}
    			}

    			append_dev(div7, t11);

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						i0,
    						"keydown",
    						function () {
    							if (is_function(/*deleteQuestion*/ ctx[12](/*question*/ ctx[6].id))) /*deleteQuestion*/ ctx[12](/*question*/ ctx[6].id).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						i0,
    						"click",
    						function () {
    							if (is_function(/*deleteQuestion*/ ctx[12](/*question*/ ctx[6].id))) /*deleteQuestion*/ ctx[12](/*question*/ ctx[6].id).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						i1,
    						"keydown",
    						function () {
    							if (is_function(/*getQuestionDetailsToUpdate*/ ctx[13](/*question*/ ctx[6].id))) /*getQuestionDetailsToUpdate*/ ctx[13](/*question*/ ctx[6].id).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						i1,
    						"click",
    						function () {
    							if (is_function(/*getQuestionDetailsToUpdate*/ ctx[13](/*question*/ ctx[6].id))) /*getQuestionDetailsToUpdate*/ ctx[13](/*question*/ ctx[6].id).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						i2,
    						"click",
    						function () {
    							if (is_function(/*questionIdToResponseChange*/ ctx[15](/*question*/ ctx[6].id))) /*questionIdToResponseChange*/ ctx[15](/*question*/ ctx[6].id).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						i2,
    						"keydown",
    						function () {
    							if (is_function(/*questionIdToResponseChange*/ ctx[15](/*question*/ ctx[6].id))) /*questionIdToResponseChange*/ ctx[15](/*question*/ ctx[6].id).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*questionsArray*/ 4 && t0_value !== (t0_value = /*question*/ ctx[6].question + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*questionsArray*/ 4 && button_data_bs_target_value !== (button_data_bs_target_value = "#collapse" + /*question*/ ctx[6].id)) {
    				attr_dev(button, "data-bs-target", button_data_bs_target_value);
    			}

    			if (dirty & /*questionsArray*/ 4 && button_aria_controls_value !== (button_aria_controls_value = "collapse" + /*question*/ ctx[6].id)) {
    				attr_dev(button, "aria-controls", button_aria_controls_value);
    			}

    			if (dirty & /*questionsArray*/ 4 && t3_value !== (t3_value = format(new Date(/*question*/ ctx[6].updated_at), "dd/mm/yyyy hh:ii") + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*questionsArray*/ 4 && t5_value !== (t5_value = /*countAnswersQuestion*/ ctx[17](/*question*/ ctx[6].id) + "")) set_data_dev(t5, t5_value);

    			if (dirty & /*questionsArray*/ 4 && h5_id_value !== (h5_id_value = "heading" + /*question*/ ctx[6].id)) {
    				attr_dev(h5, "id", h5_id_value);
    			}

    			if (dirty & /*answersArray, questionsArray*/ 36) {
    				each_value_1 = /*answersArray*/ ctx[5];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ol, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (dirty & /*questionsArray*/ 4 && div6_id_value !== (div6_id_value = "collapse" + /*question*/ ctx[6].id)) {
    				attr_dev(div6, "id", div6_id_value);
    			}

    			if (dirty & /*questionsArray*/ 4 && div6_aria_labelledby_value !== (div6_aria_labelledby_value = "heading" + /*question*/ ctx[6].id)) {
    				attr_dev(div6, "aria-labelledby", div6_aria_labelledby_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(301:12) {#each questionsArray.slice().reverse() as question}",
    		ctx
    	});

    	return block;
    }

    // (398:8) {:else}
    function create_else_block_1$1(ctx) {
    	let h5;
    	let t0;
    	let small;
    	let t1;
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			h5 = element("h5");
    			t0 = text("Modifier la question ( L'ID : ");
    			small = element("small");
    			t1 = text("YCLD ");
    			t2 = text(/*questionIdToUpdate*/ ctx[4]);
    			t3 = text(" )");
    			add_location(small, file$2, 399, 42, 11752);
    			attr_dev(h5, "class", "modal-title");
    			attr_dev(h5, "id", "exampleModalLabel");
    			add_location(h5, file$2, 398, 10, 11662);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h5, anchor);
    			append_dev(h5, t0);
    			append_dev(h5, small);
    			append_dev(small, t1);
    			append_dev(small, t2);
    			append_dev(h5, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*questionIdToUpdate*/ 16) set_data_dev(t2, /*questionIdToUpdate*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1$1.name,
    		type: "else",
    		source: "(398:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (394:8) {#if !updateQuestionState}
    function create_if_block_2(ctx) {
    	let h5;

    	const block = {
    		c: function create() {
    			h5 = element("h5");
    			h5.textContent = "Ajouter une nouvelle question pour notre communauté";
    			attr_dev(h5, "class", "modal-title");
    			attr_dev(h5, "id", "exampleModalLabel");
    			add_location(h5, file$2, 394, 10, 11508);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h5, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(394:8) {#if !updateQuestionState}",
    		ctx
    	});

    	return block;
    }

    // (411:16) {#if !updateQuestionState}
    function create_if_block_1$1(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Question du jour";
    			attr_dev(h1, "class", "text-center svelte-rah6gm");
    			add_location(h1, file$2, 411, 18, 12084);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(411:16) {#if !updateQuestionState}",
    		ctx
    	});

    	return block;
    }

    // (465:10) {:else}
    function create_else_block$1(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Modifier";
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn btn2 svelte-rah6gm");
    			add_location(button, file$2, 465, 12, 14192);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*updateQuestion*/ ctx[14], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(465:10) {:else}",
    		ctx
    	});

    	return block;
    }

    // (461:10) {#if !updateQuestionState}
    function create_if_block$1(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Publier";
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn btn2 svelte-rah6gm");
    			add_location(button, file$2, 461, 12, 14055);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*addQuestion*/ ctx[11], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(461:10) {#if !updateQuestionState}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div0;
    	let ul;
    	let li;
    	let a0;
    	let i;
    	let t0;
    	let div15;
    	let div7;
    	let div3;
    	let img;
    	let img_src_value;
    	let t1;
    	let div1;
    	let t3;
    	let div2;
    	let t5;
    	let div6;
    	let div4;
    	let a1;
    	let t7;
    	let div5;
    	let a2;
    	let t9;
    	let div14;
    	let div13;
    	let div9;
    	let div8;
    	let h2;
    	let t10;
    	let t11_value = /*questionsArray*/ ctx[2].length + "";
    	let t11;
    	let t12;
    	let t13;
    	let div12;
    	let div11;
    	let div10;
    	let t14;
    	let div27;
    	let div26;
    	let div25;
    	let div16;
    	let t15;
    	let form0;
    	let div23;
    	let div22;
    	let div21;
    	let div20;
    	let t16;
    	let div17;
    	let label0;
    	let t18;
    	let input;
    	let t19;
    	let div18;
    	let label1;
    	let t21;
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let option3;
    	let option4;
    	let option5;
    	let option6;
    	let t29;
    	let div19;
    	let label2;
    	let t31;
    	let textarea0;
    	let t32;
    	let div24;
    	let button0;
    	let t34;
    	let t35;
    	let div37;
    	let div36;
    	let div35;
    	let div28;
    	let h5;
    	let t36;
    	let small;
    	let t37;
    	let t38;
    	let t39;
    	let t40;
    	let form1;
    	let div33;
    	let div32;
    	let div31;
    	let div30;
    	let div29;
    	let label3;
    	let t42;
    	let textarea1;
    	let t43;
    	let div34;
    	let button1;
    	let t45;
    	let button2;
    	let mounted;
    	let dispose;
    	let each_value = /*questionsArray*/ ctx[2].slice().reverse();
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	function select_block_type(ctx, dirty) {
    		if (!/*updateQuestionState*/ ctx[3]) return create_if_block_2;
    		return create_else_block_1$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = !/*updateQuestionState*/ ctx[3] && create_if_block_1$1(ctx);

    	function select_block_type_1(ctx, dirty) {
    		if (!/*updateQuestionState*/ ctx[3]) return create_if_block$1;
    		return create_else_block$1;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block2 = current_block_type_1(ctx);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			ul = element("ul");
    			li = element("li");
    			a0 = element("a");
    			i = element("i");
    			t0 = space();
    			div15 = element("div");
    			div7 = element("div");
    			div3 = element("div");
    			img = element("img");
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = `${/*email*/ ctx[9]}`;
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = `${/*is_admin*/ ctx[8] ? "Admin" : "Client"}`;
    			t5 = space();
    			div6 = element("div");
    			div4 = element("div");
    			a1 = element("a");
    			a1.textContent = "YuccanLead FAQ";
    			t7 = space();
    			div5 = element("div");
    			a2 = element("a");
    			a2.textContent = "Publier une question";
    			t9 = space();
    			div14 = element("div");
    			div13 = element("div");
    			div9 = element("div");
    			div8 = element("div");
    			h2 = element("h2");
    			t10 = text("Questions publiées (");
    			t11 = text(t11_value);
    			t12 = text(")");
    			t13 = space();
    			div12 = element("div");
    			div11 = element("div");
    			div10 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t14 = space();
    			div27 = element("div");
    			div26 = element("div");
    			div25 = element("div");
    			div16 = element("div");
    			if_block0.c();
    			t15 = space();
    			form0 = element("form");
    			div23 = element("div");
    			div22 = element("div");
    			div21 = element("div");
    			div20 = element("div");
    			if (if_block1) if_block1.c();
    			t16 = space();
    			div17 = element("div");
    			label0 = element("label");
    			label0.textContent = "Titre";
    			t18 = space();
    			input = element("input");
    			t19 = space();
    			div18 = element("div");
    			label1 = element("label");
    			label1.textContent = "Sujet";
    			t21 = space();
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "Veuillez choisir un sujet";
    			option1 = element("option");
    			option1.textContent = "Service";
    			option2 = element("option");
    			option2.textContent = "SAV";
    			option3 = element("option");
    			option3.textContent = "Assistance";
    			option4 = element("option");
    			option4.textContent = "Remboursement";
    			option5 = element("option");
    			option5.textContent = "Renseignement";
    			option6 = element("option");
    			option6.textContent = "Autre";
    			t29 = space();
    			div19 = element("div");
    			label2 = element("label");
    			label2.textContent = "Question ?";
    			t31 = space();
    			textarea0 = element("textarea");
    			t32 = space();
    			div24 = element("div");
    			button0 = element("button");
    			button0.textContent = "Annuler";
    			t34 = space();
    			if_block2.c();
    			t35 = space();
    			div37 = element("div");
    			div36 = element("div");
    			div35 = element("div");
    			div28 = element("div");
    			h5 = element("h5");
    			t36 = text("Ajouter une réponse ( L'ID : ");
    			small = element("small");
    			t37 = text("YCLD ");
    			t38 = text(/*questionIdToUpdate*/ ctx[4]);
    			t39 = text(" )");
    			t40 = space();
    			form1 = element("form");
    			div33 = element("div");
    			div32 = element("div");
    			div31 = element("div");
    			div30 = element("div");
    			div29 = element("div");
    			label3 = element("label");
    			label3.textContent = "Réponse :";
    			t42 = space();
    			textarea1 = element("textarea");
    			t43 = space();
    			div34 = element("div");
    			button1 = element("button");
    			button1.textContent = "Annuler";
    			t45 = space();
    			button2 = element("button");
    			button2.textContent = "Ajouter la réponse";
    			attr_dev(i, "class", "fa fa-sign-out-alt fa-2x");
    			add_location(i, file$2, 258, 8, 6892);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "svelte-rah6gm");
    			add_location(a0, file$2, 257, 6, 6852);
    			attr_dev(li, "class", "svelte-rah6gm");
    			add_location(li, file$2, 256, 4, 6841);
    			attr_dev(ul, "class", "svelte-rah6gm");
    			add_location(ul, file$2, 255, 2, 6832);
    			attr_dev(div0, "class", "navbar-top svelte-rah6gm");
    			add_location(div0, file$2, 254, 0, 6805);
    			if (!src_url_equal(img.src, img_src_value = "assets/images/avatar.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "width", "100");
    			attr_dev(img, "height", "100");
    			attr_dev(img, "class", "svelte-rah6gm");
    			add_location(img, file$2, 267, 6, 7052);
    			attr_dev(div1, "class", "name svelte-rah6gm");
    			add_location(div1, file$2, 269, 6, 7130);
    			attr_dev(div2, "class", "name svelte-rah6gm");
    			add_location(div2, file$2, 270, 6, 7168);
    			attr_dev(div3, "class", "profile svelte-rah6gm");
    			add_location(div3, file$2, 266, 4, 7024);
    			attr_dev(a1, "href", "#profile");
    			attr_dev(a1, "class", "active svelte-rah6gm");
    			add_location(a1, file$2, 275, 8, 7298);
    			attr_dev(div4, "class", "url svelte-rah6gm");
    			add_location(div4, file$2, 274, 6, 7272);
    			attr_dev(a2, "href", "");
    			attr_dev(a2, "data-bs-toggle", "modal");
    			attr_dev(a2, "data-bs-target", "#exampleModal");
    			attr_dev(a2, "class", "active2 svelte-rah6gm");
    			add_location(a2, file$2, 279, 8, 7397);
    			attr_dev(div5, "class", "url svelte-rah6gm");
    			add_location(div5, file$2, 278, 6, 7371);
    			attr_dev(div6, "class", "sidenav-url");
    			add_location(div6, file$2, 273, 4, 7240);
    			attr_dev(div7, "class", "sidenav svelte-rah6gm");
    			add_location(div7, file$2, 265, 2, 6998);
    			attr_dev(h2, "class", "svelte-rah6gm");
    			add_location(h2, file$2, 294, 10, 7777);
    			attr_dev(div8, "class", "col-md-12 mx-auto text-center");
    			add_location(div8, file$2, 293, 8, 7723);
    			attr_dev(div9, "class", "row my-5");
    			add_location(div9, file$2, 292, 6, 7692);
    			attr_dev(div10, "class", "accordion svelte-rah6gm");
    			attr_dev(div10, "id", "accordionRental");
    			add_location(div10, file$2, 299, 10, 7933);
    			attr_dev(div11, "class", "col-md-12 mx-auto");
    			add_location(div11, file$2, 298, 8, 7891);
    			attr_dev(div12, "class", "row");
    			add_location(div12, file$2, 297, 6, 7865);
    			attr_dev(div13, "class", "container");
    			add_location(div13, file$2, 291, 4, 7662);
    			attr_dev(div14, "class", "main svelte-rah6gm");
    			add_location(div14, file$2, 290, 2, 7639);
    			attr_dev(div15, "class", "gridDashboard svelte-rah6gm");
    			add_location(div15, file$2, 264, 0, 6968);
    			attr_dev(div16, "class", "modal-header");
    			add_location(div16, file$2, 392, 6, 11436);
    			attr_dev(label0, "for", "");
    			attr_dev(label0, "class", "svelte-rah6gm");
    			add_location(label0, file$2, 414, 18, 12211);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", "Ex: Système de parrainage");
    			attr_dev(input, "class", "i-box form-control input-lg");
    			input.required = true;
    			add_location(input, file$2, 415, 18, 12257);
    			attr_dev(div17, "class", "form-group svelte-rah6gm");
    			add_location(div17, file$2, 413, 16, 12168);
    			attr_dev(label1, "for", "");
    			attr_dev(label1, "class", "svelte-rah6gm");
    			add_location(label1, file$2, 424, 18, 12583);
    			option0.__value = "";
    			option0.value = option0.__value;
    			option0.selected = true;
    			option0.disabled = true;
    			add_location(option0, file$2, 430, 20, 12797);
    			option1.__value = "service";
    			option1.value = option1.__value;
    			add_location(option1, file$2, 434, 20, 12932);
    			option2.__value = "sav";
    			option2.value = option2.__value;
    			add_location(option2, file$2, 435, 20, 12993);
    			option3.__value = "assistance";
    			option3.value = option3.__value;
    			add_location(option3, file$2, 436, 20, 13046);
    			option4.__value = "remboursement";
    			option4.value = option4.__value;
    			add_location(option4, file$2, 437, 20, 13113);
    			option5.__value = "renseignement";
    			option5.value = option5.__value;
    			add_location(option5, file$2, 438, 20, 13186);
    			option6.__value = "autre";
    			option6.value = option6.__value;
    			add_location(option6, file$2, 439, 20, 13259);
    			select.required = true;
    			attr_dev(select, "class", "form-control input-lg");
    			if (/*subject*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[19].call(select));
    			add_location(select, file$2, 425, 18, 12629);
    			attr_dev(div18, "class", "form-group svelte-rah6gm");
    			add_location(div18, file$2, 423, 16, 12540);
    			attr_dev(label2, "for", "");
    			attr_dev(label2, "class", "svelte-rah6gm");
    			add_location(label2, file$2, 443, 18, 13406);
    			attr_dev(textarea0, "row", "5");
    			attr_dev(textarea0, "class", "form-control input-lg");
    			attr_dev(textarea0, "type", "text");
    			attr_dev(textarea0, "placeholder", "Ex: Comment puis-je effectuer un don à une organisation caritative via Yuccan Lead ? ..");
    			add_location(textarea0, file$2, 444, 18, 13457);
    			attr_dev(div19, "class", "form-group svelte-rah6gm");
    			add_location(div19, file$2, 442, 16, 13363);
    			attr_dev(div20, "class", "col");
    			add_location(div20, file$2, 409, 14, 12005);
    			attr_dev(div21, "class", "row");
    			add_location(div21, file$2, 408, 12, 11973);
    			attr_dev(div22, "class", "container");
    			add_location(div22, file$2, 407, 10, 11937);
    			attr_dev(div23, "class", "modal-body");
    			add_location(div23, file$2, 406, 8, 11902);
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "btn btn1 svelte-rah6gm");
    			attr_dev(button0, "data-bs-dismiss", "modal");
    			add_location(button0, file$2, 457, 10, 13902);
    			attr_dev(div24, "class", "modal-footer");
    			add_location(div24, file$2, 456, 8, 13865);
    			attr_dev(form0, "class", "pad-bg svelte-rah6gm");
    			add_location(form0, file$2, 405, 6, 11872);
    			attr_dev(div25, "class", "modal-content");
    			add_location(div25, file$2, 391, 4, 11402);
    			attr_dev(div26, "class", "modal-dialog");
    			attr_dev(div26, "role", "document");
    			add_location(div26, file$2, 390, 2, 11355);
    			attr_dev(div27, "class", "modal fade");
    			attr_dev(div27, "id", "exampleModal");
    			attr_dev(div27, "tabindex", "-1");
    			attr_dev(div27, "role", "dialog");
    			attr_dev(div27, "aria-labelledby", "exampleModalLabel");
    			attr_dev(div27, "aria-hidden", "true");
    			add_location(div27, file$2, 382, 0, 11214);
    			add_location(small, file$2, 487, 39, 14717);
    			attr_dev(h5, "class", "modal-title");
    			attr_dev(h5, "id", "answerModalLabel");
    			add_location(h5, file$2, 486, 8, 14631);
    			attr_dev(div28, "class", "modal-header");
    			add_location(div28, file$2, 485, 6, 14596);
    			attr_dev(label3, "for", "");
    			attr_dev(label3, "class", "svelte-rah6gm");
    			add_location(label3, file$2, 498, 18, 15027);
    			attr_dev(textarea1, "rows", "5");
    			textarea1.required = true;
    			attr_dev(textarea1, "type", "text");
    			attr_dev(textarea1, "placeholder", "....");
    			attr_dev(textarea1, "class", "form-control input-lg");
    			add_location(textarea1, file$2, 499, 18, 15078);
    			attr_dev(div29, "class", "form-group svelte-rah6gm");
    			add_location(div29, file$2, 497, 16, 14984);
    			attr_dev(div30, "class", "col");
    			add_location(div30, file$2, 496, 14, 14950);
    			attr_dev(div31, "class", "row");
    			add_location(div31, file$2, 495, 12, 14918);
    			attr_dev(div32, "class", "container");
    			add_location(div32, file$2, 494, 10, 14882);
    			attr_dev(div33, "class", "modal-body");
    			add_location(div33, file$2, 493, 8, 14847);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "btn btn1 svelte-rah6gm");
    			attr_dev(button1, "data-bs-dismiss", "modal");
    			add_location(button1, file$2, 513, 10, 15468);
    			attr_dev(button2, "type", "button");
    			attr_dev(button2, "class", "btn btn2 svelte-rah6gm");
    			add_location(button2, file$2, 517, 10, 15583);
    			attr_dev(div34, "class", "modal-footer");
    			add_location(div34, file$2, 512, 8, 15431);
    			attr_dev(form1, "class", "pad-bg svelte-rah6gm");
    			add_location(form1, file$2, 492, 6, 14817);
    			attr_dev(div35, "class", "modal-content");
    			add_location(div35, file$2, 484, 4, 14562);
    			attr_dev(div36, "class", "modal-dialog");
    			attr_dev(div36, "role", "document");
    			add_location(div36, file$2, 483, 2, 14515);
    			attr_dev(div37, "class", "modal fade svelte-rah6gm");
    			attr_dev(div37, "id", "answerModal");
    			attr_dev(div37, "tabindex", "-1");
    			attr_dev(div37, "role", "dialog");
    			attr_dev(div37, "aria-labelledby", "answerModalLabel");
    			attr_dev(div37, "aria-hidden", "true");
    			add_location(div37, file$2, 475, 0, 14376);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, ul);
    			append_dev(ul, li);
    			append_dev(li, a0);
    			append_dev(a0, i);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div15, anchor);
    			append_dev(div15, div7);
    			append_dev(div7, div3);
    			append_dev(div3, img);
    			append_dev(div3, t1);
    			append_dev(div3, div1);
    			append_dev(div3, t3);
    			append_dev(div3, div2);
    			append_dev(div7, t5);
    			append_dev(div7, div6);
    			append_dev(div6, div4);
    			append_dev(div4, a1);
    			append_dev(div6, t7);
    			append_dev(div6, div5);
    			append_dev(div5, a2);
    			append_dev(div15, t9);
    			append_dev(div15, div14);
    			append_dev(div14, div13);
    			append_dev(div13, div9);
    			append_dev(div9, div8);
    			append_dev(div8, h2);
    			append_dev(h2, t10);
    			append_dev(h2, t11);
    			append_dev(h2, t12);
    			append_dev(div13, t13);
    			append_dev(div13, div12);
    			append_dev(div12, div11);
    			append_dev(div11, div10);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div10, null);
    				}
    			}

    			insert_dev(target, t14, anchor);
    			insert_dev(target, div27, anchor);
    			append_dev(div27, div26);
    			append_dev(div26, div25);
    			append_dev(div25, div16);
    			if_block0.m(div16, null);
    			append_dev(div25, t15);
    			append_dev(div25, form0);
    			append_dev(form0, div23);
    			append_dev(div23, div22);
    			append_dev(div22, div21);
    			append_dev(div21, div20);
    			if (if_block1) if_block1.m(div20, null);
    			append_dev(div20, t16);
    			append_dev(div20, div17);
    			append_dev(div17, label0);
    			append_dev(div17, t18);
    			append_dev(div17, input);
    			set_input_value(input, /*title*/ ctx[0]);
    			append_dev(div20, t19);
    			append_dev(div20, div18);
    			append_dev(div18, label1);
    			append_dev(div18, t21);
    			append_dev(div18, select);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			append_dev(select, option2);
    			append_dev(select, option3);
    			append_dev(select, option4);
    			append_dev(select, option5);
    			append_dev(select, option6);
    			select_option(select, /*subject*/ ctx[1], true);
    			append_dev(div20, t29);
    			append_dev(div20, div19);
    			append_dev(div19, label2);
    			append_dev(div19, t31);
    			append_dev(div19, textarea0);
    			set_input_value(textarea0, /*question*/ ctx[6]);
    			append_dev(form0, t32);
    			append_dev(form0, div24);
    			append_dev(div24, button0);
    			append_dev(div24, t34);
    			if_block2.m(div24, null);
    			insert_dev(target, t35, anchor);
    			insert_dev(target, div37, anchor);
    			append_dev(div37, div36);
    			append_dev(div36, div35);
    			append_dev(div35, div28);
    			append_dev(div28, h5);
    			append_dev(h5, t36);
    			append_dev(h5, small);
    			append_dev(small, t37);
    			append_dev(small, t38);
    			append_dev(h5, t39);
    			append_dev(div35, t40);
    			append_dev(div35, form1);
    			append_dev(form1, div33);
    			append_dev(div33, div32);
    			append_dev(div32, div31);
    			append_dev(div31, div30);
    			append_dev(div30, div29);
    			append_dev(div29, label3);
    			append_dev(div29, t42);
    			append_dev(div29, textarea1);
    			set_input_value(textarea1, /*answer*/ ctx[7]);
    			append_dev(form1, t43);
    			append_dev(form1, div34);
    			append_dev(div34, button1);
    			append_dev(div34, t45);
    			append_dev(div34, button2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(a0, "click", /*signout*/ ctx[10], false, false, false, false),
    					listen_dev(
    						a2,
    						"click",
    						function () {
    							if (is_function(/*updateQuestionState*/ ctx[3] = false)) (/*updateQuestionState*/ ctx[3] = false).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(input, "input", /*input_input_handler*/ ctx[18]),
    					listen_dev(select, "change", /*select_change_handler*/ ctx[19]),
    					listen_dev(textarea0, "input", /*textarea0_input_handler*/ ctx[20]),
    					listen_dev(textarea1, "input", /*textarea1_input_handler*/ ctx[21]),
    					listen_dev(
    						button2,
    						"click",
    						function () {
    							if (is_function(/*addAnswer*/ ctx[16](/*question*/ ctx[6].id))) /*addAnswer*/ ctx[16](/*question*/ ctx[6].id).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if (dirty & /*questionsArray*/ 4 && t11_value !== (t11_value = /*questionsArray*/ ctx[2].length + "")) set_data_dev(t11, t11_value);

    			if (dirty & /*questionsArray, answersArray, questionIdToResponseChange, getQuestionDetailsToUpdate, deleteQuestion, countAnswersQuestion, format, Date*/ 176164) {
    				each_value = /*questionsArray*/ ctx[2].slice().reverse();
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div10, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div16, null);
    				}
    			}

    			if (!/*updateQuestionState*/ ctx[3]) {
    				if (if_block1) ; else {
    					if_block1 = create_if_block_1$1(ctx);
    					if_block1.c();
    					if_block1.m(div20, t16);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*title*/ 1 && input.value !== /*title*/ ctx[0]) {
    				set_input_value(input, /*title*/ ctx[0]);
    			}

    			if (dirty & /*subject*/ 2) {
    				select_option(select, /*subject*/ ctx[1]);
    			}

    			if (dirty & /*question*/ 64) {
    				set_input_value(textarea0, /*question*/ ctx[6]);
    			}

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block2) {
    				if_block2.p(ctx, dirty);
    			} else {
    				if_block2.d(1);
    				if_block2 = current_block_type_1(ctx);

    				if (if_block2) {
    					if_block2.c();
    					if_block2.m(div24, null);
    				}
    			}

    			if (dirty & /*questionIdToUpdate*/ 16) set_data_dev(t38, /*questionIdToUpdate*/ ctx[4]);

    			if (dirty & /*answer*/ 128) {
    				set_input_value(textarea1, /*answer*/ ctx[7]);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div15);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(div27);
    			if_block0.d();
    			if (if_block1) if_block1.d();
    			if_block2.d();
    			if (detaching) detach_dev(t35);
    			if (detaching) detach_dev(div37);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DashboardScreen', slots, []);
    	let is_admin = localStorage.getItem("is_admin");
    	let email = localStorage.getItem("useremail");

    	onMount(async () => {
    		getQuestions();
    		getAnswers();
    		const token = localStorage.getItem("token");

    		if (token === null || token.trim() === "") {
    			navigate("/");
    		}
    	});

    	function signout(event) {
    		let timerInterval;

    		Swal.fire({
    			title: "Chargement...",
    			timer: 2000,
    			timerProgressBar: true,
    			didOpen: () => {
    				Swal.showLoading();
    				const b = Swal.getHtmlContainer().querySelector("b");

    				timerInterval = setInterval(
    					() => {
    						b.textContent = Swal.getTimerLeft();
    					},
    					100
    				);
    			},
    			willClose: () => {
    				clearInterval(timerInterval);
    			}
    		});

    		localStorage.removeItem("token");
    		localStorage.removeItem("is_admin");
    		localStorage.removeItem("useremail");
    		localStorage.removeItem("user_id");
    	}

    	let title = "";
    	let subject = "";
    	let question = "";

    	async function addQuestion(event) {
    		if (title.trim().length < 4 || title == "") {
    			Swal.fire({
    				icon: "error",
    				title: "Veuillez vérifier les informations saisies",
    				text: "Titre : 3 caractéres minimum",
    				showCancelButton: false,
    				confirmButtonColor: "#132d79",
    				confirmButtonText: "Compris !",
    				closeOnConfirm: true
    			});
    		} else if (title.trim().length < 4 || title == "") {
    			Swal.fire({
    				icon: "error",
    				title: "Veuillez vérifier les informations saisies",
    				text: "Titre : 3 caractéres minimum",
    				showCancelButton: false,
    				confirmButtonColor: "#132d79",
    				confirmButtonText: "Compris !",
    				closeOnConfirm: true
    			});
    		} else if (subject == "") {
    			Swal.fire({
    				icon: "error",
    				title: "Sujet non selectionné",
    				showCancelButton: false,
    				confirmButtonColor: "#132d79",
    				confirmButtonText: "Compris !",
    				closeOnConfirm: true
    			});
    		} else if (question == "" || question.trim().length < 10) {
    			Swal.fire({
    				icon: "error",
    				title: "Question : 10 caractéres minimum",
    				showCancelButton: false,
    				confirmButtonColor: "#132d79",
    				confirmButtonText: "Compris !",
    				closeOnConfirm: true
    			});
    		} else {
    			try {
    				const response = await axios$1.post("http://localhost:8080/api/question/add", {
    					title,
    					subject,
    					question,
    					user_id: localStorage.getItem("user_id")
    				});

    				Swal.fire({
    					icon: "success",
    					text: "Votre question à été bien ajoutée à notre plateforme",
    					showCancelButton: false,
    					confirmButtonColor: "black",
    					confirmButtonText: "Fermer !",
    					closeOnConfirm: true
    				});

    				$$invalidate(0, title = "");
    				$$invalidate(6, question = "");
    				$$invalidate(1, subject = "");
    				getQuestions();
    			} catch(error) {
    				console.log(error);
    			}
    		}
    	}

    	let questionsArray = [];

    	async function getQuestions() {
    		$$invalidate(2, questionsArray = []);

    		try {
    			let response = await axios$1.get("http://localhost:8080/api/questions/");

    			// response.data.forEach(element => {
    			//     questionsArray.push(element);
    			// });
    			$$invalidate(2, questionsArray = response.data);
    		} catch(error) {
    			
    		}
    	}

    	async function deleteQuestion(id) {
    		console.log(id);

    		Swal.fire({
    			title: "Êtes-vous sûr(e) ?",
    			text: "Attention, si vous appuyez sur ce bouton, les modifications seront définitives. Vous ne pourrez pas annuler cela !",
    			icon: "warning",
    			showCancelButton: true,
    			confirmButtonColor: "#3085d6",
    			cancelButtonColor: "black",
    			confirmButtonText: "Supprimer",
    			cancelButtonText: "Annuler"
    		}).then(result => {
    			try {
    				let response = axios$1.delete("http://localhost:8080/api/question/delete/" + id);
    				console.log(response);

    				if (result.isConfirmed) {
    					Swal.fire({
    						title: "Suppression réussie !",
    						text: "La question a été supprimée",
    						icon: "success",
    						showCancelButton: false,
    						confirmButtonColor: "black",
    						confirmButtonText: "YuccanLead FAQ"
    					});

    					getQuestions();
    				}
    			} catch(error) {
    				console.log("error");
    			}
    		});
    	}

    	let updateQuestionState = false;
    	let questionIdToUpdate = 0;

    	async function getQuestionDetailsToUpdate(id) {
    		$$invalidate(3, updateQuestionState = true);
    		$$invalidate(4, questionIdToUpdate = id);

    		try {
    			let response = await axios$1.get("http://localhost:8080/api/question/" + id);
    			$$invalidate(0, title = response.data.data.title);
    			$$invalidate(1, subject = response.data.data.subject);
    			$$invalidate(6, question = response.data.data.question);
    			console.log(response.data.data);
    		} catch(error) {
    			
    		}
    	}

    	async function updateQuestion() {
    		try {
    			let response = await axios$1.put("http://localhost:8080/api/question/update/" + questionIdToUpdate, { title, subject, question });
    			getQuestions();
    		} catch(error) {
    			
    		}
    	}

    	let answer = "";
    	var questionIdToResponse = 0;

    	function questionIdToResponseChange(id) {
    		questionIdToResponse = id;
    		console.log(questionIdToResponse);
    	}

    	async function addAnswer() {
    		try {
    			let response = await axios$1.post("http://localhost:8080/api/answer/add", {
    				answer,
    				user_id: localStorage.getItem("user_id"),
    				question: questionIdToResponse
    			});

    			Swal.fire({
    				icon: "success",
    				text: "Votre réponse à été bien ajoutée à notre plateforme",
    				showCancelButton: false,
    				confirmButtonColor: "black",
    				confirmButtonText: "Fermer !",
    				closeOnConfirm: true
    			});

    			getAnswers();
    			getQuestions();
    			$$invalidate(7, answer = "");
    			console.log(response);
    		} catch(error) {
    			
    		}
    	}

    	let answersArray = [];

    	async function getAnswers() {
    		$$invalidate(5, answersArray = []);

    		try {
    			let response = await axios$1.get("http://localhost:8080/api/answers/");
    			$$invalidate(5, answersArray = response.data);
    			console.log(typeof answersArray, typeof response);
    		} catch(error) {
    			
    		}
    	}

    	function countAnswersQuestion(id) {
    		let count = 0;

    		answersArray.forEach(element => {
    			if (element.question == id) {
    				count++;
    			}
    		});

    		return count;
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<DashboardScreen> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		title = this.value;
    		$$invalidate(0, title);
    	}

    	function select_change_handler() {
    		subject = select_value(this);
    		$$invalidate(1, subject);
    	}

    	function textarea0_input_handler() {
    		question = this.value;
    		$$invalidate(6, question);
    	}

    	function textarea1_input_handler() {
    		answer = this.value;
    		$$invalidate(7, answer);
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		axios: axios$1,
    		Swal,
    		format,
    		is_admin,
    		email,
    		navigate,
    		signout,
    		title,
    		subject,
    		question,
    		addQuestion,
    		questionsArray,
    		getQuestions,
    		deleteQuestion,
    		updateQuestionState,
    		questionIdToUpdate,
    		getQuestionDetailsToUpdate,
    		updateQuestion,
    		answer,
    		questionIdToResponse,
    		questionIdToResponseChange,
    		addAnswer,
    		answersArray,
    		getAnswers,
    		countAnswersQuestion
    	});

    	$$self.$inject_state = $$props => {
    		if ('is_admin' in $$props) $$invalidate(8, is_admin = $$props.is_admin);
    		if ('email' in $$props) $$invalidate(9, email = $$props.email);
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('subject' in $$props) $$invalidate(1, subject = $$props.subject);
    		if ('question' in $$props) $$invalidate(6, question = $$props.question);
    		if ('questionsArray' in $$props) $$invalidate(2, questionsArray = $$props.questionsArray);
    		if ('updateQuestionState' in $$props) $$invalidate(3, updateQuestionState = $$props.updateQuestionState);
    		if ('questionIdToUpdate' in $$props) $$invalidate(4, questionIdToUpdate = $$props.questionIdToUpdate);
    		if ('answer' in $$props) $$invalidate(7, answer = $$props.answer);
    		if ('questionIdToResponse' in $$props) questionIdToResponse = $$props.questionIdToResponse;
    		if ('answersArray' in $$props) $$invalidate(5, answersArray = $$props.answersArray);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		title,
    		subject,
    		questionsArray,
    		updateQuestionState,
    		questionIdToUpdate,
    		answersArray,
    		question,
    		answer,
    		is_admin,
    		email,
    		signout,
    		addQuestion,
    		deleteQuestion,
    		getQuestionDetailsToUpdate,
    		updateQuestion,
    		questionIdToResponseChange,
    		addAnswer,
    		countAnswersQuestion,
    		input_input_handler,
    		select_change_handler,
    		textarea0_input_handler,
    		textarea1_input_handler
    	];
    }

    class DashboardScreen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DashboardScreen",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/routes/ChatgptScreen.svelte generated by Svelte v3.58.0 */
    const file$1 = "src/routes/ChatgptScreen.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (96:20) {:else}
    function create_else_block_1(ctx) {
    	let ul;
    	let li;
    	let h5;

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			li = element("li");
    			h5 = element("h5");
    			h5.textContent = "Obtenir des réponses rapides et précises avec\n                            ChatGPT";
    			attr_dev(h5, "class", "text-dark");
    			add_location(h5, file$1, 98, 26, 3221);
    			attr_dev(li, "class", "svelte-he0dak");
    			add_location(li, file$1, 97, 24, 3190);
    			attr_dev(ul, "class", "svelte-he0dak");
    			add_location(ul, file$1, 96, 22, 3161);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li);
    			append_dev(li, h5);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(96:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (80:20) {#if $chatResponses.length > 0}
    function create_if_block(ctx) {
    	let ul;
    	let each_value = /*$chatResponses*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "svelte-he0dak");
    			add_location(ul, file$1, 80, 22, 2499);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul, null);
    				}
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$chatResponses*/ 2) {
    				each_value = /*$chatResponses*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(80:20) {#if $chatResponses.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (88:26) {:else}
    function create_else_block(ctx) {
    	let li;
    	let p;
    	let t0_value = /*response*/ ctx[6] + "";
    	let t0;
    	let t1;
    	let span;
    	let t3;

    	const block = {
    		c: function create() {
    			li = element("li");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			span = element("span");
    			span.textContent = "10:38";
    			t3 = space();
    			attr_dev(p, "class", "svelte-he0dak");
    			add_location(p, file$1, 89, 30, 2918);
    			attr_dev(span, "class", "svelte-he0dak");
    			add_location(span, file$1, 90, 30, 2966);
    			attr_dev(li, "class", "response svelte-he0dak");
    			add_location(li, file$1, 88, 28, 2866);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, p);
    			append_dev(p, t0);
    			append_dev(li, t1);
    			append_dev(li, span);
    			append_dev(li, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$chatResponses*/ 2 && t0_value !== (t0_value = /*response*/ ctx[6] + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(88:26) {:else}",
    		ctx
    	});

    	return block;
    }

    // (83:26) {#if response.startsWith("Vous:")}
    function create_if_block_1(ctx) {
    	let li;
    	let p;
    	let t0_value = /*response*/ ctx[6] + "";
    	let t0;
    	let t1;
    	let span;
    	let t3;

    	const block = {
    		c: function create() {
    			li = element("li");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			span = element("span");
    			span.textContent = "10:38";
    			t3 = space();
    			attr_dev(p, "class", "svelte-he0dak");
    			add_location(p, file$1, 84, 30, 2703);
    			attr_dev(span, "class", "svelte-he0dak");
    			add_location(span, file$1, 85, 30, 2751);
    			attr_dev(li, "class", "request svelte-he0dak");
    			add_location(li, file$1, 83, 28, 2652);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, p);
    			append_dev(p, t0);
    			append_dev(li, t1);
    			append_dev(li, span);
    			append_dev(li, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$chatResponses*/ 2 && t0_value !== (t0_value = /*response*/ ctx[6] + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(83:26) {#if response.startsWith(\\\"Vous:\\\")}",
    		ctx
    	});

    	return block;
    }

    // (82:24) {#each $chatResponses as response}
    function create_each_block(ctx) {
    	let show_if;
    	let if_block_anchor;

    	function select_block_type_1(ctx, dirty) {
    		if (dirty & /*$chatResponses*/ 2) show_if = null;
    		if (show_if == null) show_if = !!/*response*/ ctx[6].startsWith("Vous:");
    		if (show_if) return create_if_block_1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type_1(ctx, -1);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type_1(ctx, dirty)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(82:24) {#each $chatResponses as response}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let section;
    	let div14;
    	let div13;
    	let div12;
    	let div11;
    	let div10;
    	let div9;
    	let div8;
    	let div4;
    	let div3;
    	let div2;
    	let div1;
    	let span;
    	let img;
    	let img_src_value;
    	let t0;
    	let div0;
    	let h3;
    	let t2;
    	let p;
    	let t4;
    	let div6;
    	let div5;
    	let t5;
    	let div7;
    	let form;
    	let input;
    	let t6;
    	let button;
    	let i;
    	let t7;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*$chatResponses*/ ctx[1].length > 0) return create_if_block;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			div14 = element("div");
    			div13 = element("div");
    			div12 = element("div");
    			div11 = element("div");
    			div10 = element("div");
    			div9 = element("div");
    			div8 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			span = element("span");
    			img = element("img");
    			t0 = space();
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Améliorez l'expérience utilisateur et réduisez la\n                            charge de travail de votre équipe de support grâce à\n                            ChatGPT sur votre site Web FAQ";
    			t2 = space();
    			p = element("p");
    			p.textContent = "Améliorez votre FAQ avec ChatGPT API";
    			t4 = space();
    			div6 = element("div");
    			div5 = element("div");
    			if_block.c();
    			t5 = space();
    			div7 = element("div");
    			form = element("form");
    			input = element("input");
    			t6 = space();
    			button = element("button");
    			i = element("i");
    			t7 = text("Envoyer");
    			attr_dev(img, "class", "img-fluid svelte-he0dak");
    			if (!src_url_equal(img.src, img_src_value = "assets/images/chatgpt.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "imagemmmmeere");
    			add_location(img, file$1, 57, 27, 1550);
    			attr_dev(span, "class", "chat-icon svelte-he0dak");
    			add_location(span, file$1, 56, 24, 1499);
    			attr_dev(h3, "class", "svelte-he0dak");
    			add_location(h3, file$1, 65, 26, 1875);
    			attr_dev(p, "class", "svelte-he0dak");
    			add_location(p, file$1, 70, 26, 2156);
    			attr_dev(div0, "class", "flex-grow-1 ms-3");
    			add_location(div0, file$1, 64, 24, 1818);
    			attr_dev(div1, "class", "");
    			add_location(div1, file$1, 55, 22, 1460);
    			attr_dev(div2, "class", "col-12");
    			add_location(div2, file$1, 54, 20, 1417);
    			attr_dev(div3, "class", "row");
    			add_location(div3, file$1, 53, 18, 1379);
    			attr_dev(div4, "class", "chatBoxHead svelte-he0dak");
    			add_location(div4, file$1, 52, 16, 1335);
    			attr_dev(div5, "class", "chatboxBodyAux svelte-he0dak");
    			add_location(div5, file$1, 78, 18, 2396);
    			attr_dev(div6, "class", "chatboxBody");
    			add_location(div6, file$1, 77, 16, 2352);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "form-control svelte-he0dak");
    			attr_dev(input, "aria-label", "message…");
    			attr_dev(input, "placeholder", "Veuillez écrire votre demande ici");
    			add_location(input, file$1, 110, 20, 3641);
    			attr_dev(i, "class", "fa fa-paper-plane svelte-he0dak");
    			attr_dev(i, "aria-hidden", "true");
    			add_location(i, file$1, 119, 23, 3975);
    			attr_dev(button, "type", "submit");
    			attr_dev(button, "class", "svelte-he0dak");
    			add_location(button, file$1, 118, 20, 3930);
    			attr_dev(form, "class", "svelte-he0dak");
    			add_location(form, file$1, 109, 18, 3580);
    			attr_dev(div7, "class", "inputChatBox svelte-he0dak");
    			add_location(div7, file$1, 108, 16, 3535);
    			attr_dev(div8, "class", "modal-content");
    			add_location(div8, file$1, 51, 14, 1291);
    			attr_dev(div9, "class", "");
    			add_location(div9, file$1, 50, 12, 1262);
    			attr_dev(div10, "class", "chatbox svelte-he0dak");
    			add_location(div10, file$1, 49, 10, 1228);
    			attr_dev(div11, "class", "chatboxAux svelte-he0dak");
    			add_location(div11, file$1, 48, 8, 1193);
    			attr_dev(div12, "class", "col-12 m-0 p-0");
    			add_location(div12, file$1, 47, 6, 1156);
    			attr_dev(div13, "class", "row m-0 p-0");
    			add_location(div13, file$1, 46, 4, 1124);
    			attr_dev(div14, "class", "");
    			add_location(div14, file$1, 45, 2, 1105);
    			attr_dev(section, "class", "chatboxContainer svelte-he0dak");
    			add_location(section, file$1, 44, 0, 1068);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div14);
    			append_dev(div14, div13);
    			append_dev(div13, div12);
    			append_dev(div12, div11);
    			append_dev(div11, div10);
    			append_dev(div10, div9);
    			append_dev(div9, div8);
    			append_dev(div8, div4);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			append_dev(div1, span);
    			append_dev(span, img);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, h3);
    			append_dev(div0, t2);
    			append_dev(div0, p);
    			append_dev(div8, t4);
    			append_dev(div8, div6);
    			append_dev(div6, div5);
    			if_block.m(div5, null);
    			append_dev(div8, t5);
    			append_dev(div8, div7);
    			append_dev(div7, form);
    			append_dev(form, input);
    			set_input_value(input, /*messageChat*/ ctx[0]);
    			append_dev(form, t6);
    			append_dev(form, button);
    			append_dev(button, i);
    			append_dev(button, t7);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[4]),
    					listen_dev(form, "submit", /*sendChatGptRequestion*/ ctx[3], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div5, null);
    				}
    			}

    			if (dirty & /*messageChat*/ 1 && input.value !== /*messageChat*/ ctx[0]) {
    				set_input_value(input, /*messageChat*/ ctx[0]);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const chatgptAiUrl = "https://api.openai.com/v1/engines/davinci/completions";
    const apiKey = "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";

    function instance$1($$self, $$props, $$invalidate) {
    	let $chatResponses;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChatgptScreen', slots, []);
    	let messageChat = "";
    	let messageChatAux = "";
    	let chatResponses = writable([]);
    	validate_store(chatResponses, 'chatResponses');
    	component_subscribe($$self, chatResponses, value => $$invalidate(1, $chatResponses = value));

    	async function sendChatGptRequestion(e) {
    		messageChatAux = messageChat;
    		$$invalidate(0, messageChat = "");
    		e.preventDefault();

    		if (messageChatAux.trim() === "") {
    			return;
    		}

    		chatResponses.update(responses => [...responses, `Vous: ${messageChatAux}\n`]);

    		const response = await axios$1.post(
    			chatgptAiUrl,
    			{
    				prompt: `Q: ${messageChatAux}\nA:`,
    				max_tokens: 60,
    				n: 1,
    				stop: ["\n"]
    			},
    			{
    				headers: { Authorization: `Bearer ${apiKey}` }
    			}
    		);

    		const answer = response.data.choices[0].text.trim();
    		chatResponses.update(responses => [...responses, `Robot: ${answer}\n`]);
    		messageChatAux = "";
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChatgptScreen> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		messageChat = this.value;
    		$$invalidate(0, messageChat);
    	}

    	$$self.$capture_state = () => ({
    		writable,
    		axios: axios$1,
    		messageChat,
    		messageChatAux,
    		chatResponses,
    		chatgptAiUrl,
    		apiKey,
    		sendChatGptRequestion,
    		$chatResponses
    	});

    	$$self.$inject_state = $$props => {
    		if ('messageChat' in $$props) $$invalidate(0, messageChat = $$props.messageChat);
    		if ('messageChatAux' in $$props) messageChatAux = $$props.messageChatAux;
    		if ('chatResponses' in $$props) $$invalidate(2, chatResponses = $$props.chatResponses);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		messageChat,
    		$chatResponses,
    		chatResponses,
    		sendChatGptRequestion,
    		input_input_handler
    	];
    }

    class ChatgptScreen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChatgptScreen",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.58.0 */
    const file = "src/App.svelte";

    // (18:4) <Router>
    function create_default_slot_1(ctx) {
    	let route0;
    	let t0;
    	let route1;
    	let t1;
    	let route2;
    	let t2;
    	let route3;
    	let t3;
    	let route4;
    	let t4;
    	let route5;
    	let t5;
    	let route6;
    	let t6;
    	let route7;
    	let t7;
    	let route8;
    	let t8;
    	let route9;
    	let current;

    	route0 = new Route({
    			props: { path: "/", component: LandingScreen },
    			$$inline: true
    		});

    	route1 = new Route({
    			props: { path: "/faq", component: FaqScreen },
    			$$inline: true
    		});

    	route2 = new Route({
    			props: { path: "/login", component: LoginScreen },
    			$$inline: true
    		});

    	route3 = new Route({
    			props: { path: "/signup", component: SignupScreen },
    			$$inline: true
    		});

    	route4 = new Route({
    			props: {
    				path: "/userHistory",
    				component: HistoriqueScreen
    			},
    			$$inline: true
    		});

    	route5 = new Route({
    			props: {
    				path: "/contact",
    				component: ContactScreen
    			},
    			$$inline: true
    		});

    	route6 = new Route({
    			props: { path: "/about", component: AboutScreen },
    			$$inline: true
    		});

    	route7 = new Route({
    			props: {
    				path: "/welcome",
    				component: WelcomeScreen
    			},
    			$$inline: true
    		});

    	route8 = new Route({
    			props: {
    				path: "/dashboard",
    				component: DashboardScreen
    			},
    			$$inline: true
    		});

    	route9 = new Route({
    			props: {
    				path: "/chatgpt",
    				component: ChatgptScreen
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route0.$$.fragment);
    			t0 = space();
    			create_component(route1.$$.fragment);
    			t1 = space();
    			create_component(route2.$$.fragment);
    			t2 = space();
    			create_component(route3.$$.fragment);
    			t3 = space();
    			create_component(route4.$$.fragment);
    			t4 = space();
    			create_component(route5.$$.fragment);
    			t5 = space();
    			create_component(route6.$$.fragment);
    			t6 = space();
    			create_component(route7.$$.fragment);
    			t7 = space();
    			create_component(route8.$$.fragment);
    			t8 = space();
    			create_component(route9.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(route1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(route2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(route3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(route4, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(route5, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(route6, target, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(route7, target, anchor);
    			insert_dev(target, t7, anchor);
    			mount_component(route8, target, anchor);
    			insert_dev(target, t8, anchor);
    			mount_component(route9, target, anchor);
    			current = true;
    		},
    		p: noop$1,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			transition_in(route3.$$.fragment, local);
    			transition_in(route4.$$.fragment, local);
    			transition_in(route5.$$.fragment, local);
    			transition_in(route6.$$.fragment, local);
    			transition_in(route7.$$.fragment, local);
    			transition_in(route8.$$.fragment, local);
    			transition_in(route9.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			transition_out(route3.$$.fragment, local);
    			transition_out(route4.$$.fragment, local);
    			transition_out(route5.$$.fragment, local);
    			transition_out(route6.$$.fragment, local);
    			transition_out(route7.$$.fragment, local);
    			transition_out(route8.$$.fragment, local);
    			transition_out(route9.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(route1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(route2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(route3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(route4, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(route5, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(route6, detaching);
    			if (detaching) detach_dev(t6);
    			destroy_component(route7, detaching);
    			if (detaching) detach_dev(t7);
    			destroy_component(route8, detaching);
    			if (detaching) detach_dev(t8);
    			destroy_component(route9, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(18:4) <Router>",
    		ctx
    	});

    	return block;
    }

    // (17:2) <Layout>
    function create_default_slot(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const router_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(17:2) <Layout>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let layout;
    	let current;

    	layout = new Layout({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(layout.$$.fragment);
    			attr_dev(main, "class", "m-0 p-0 svelte-bheydx");
    			add_location(main, file, 15, 0, 725);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(layout, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layout_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(layout);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Layout,
    		LandingScreen,
    		Router,
    		Route,
    		Link,
    		FaqScreen,
    		LoginScreen,
    		SignupScreen,
    		HistoriqueScreen,
    		ContactScreen,
    		AboutScreen,
    		WelcomeScreen,
    		DashboardScreen,
    		ChatgptScreen
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
