import { bL as P_PUBLIC_SUFFIX_LIST, bM as P_STARSHELL_DECREES, d as SvelteComponent, i as init, e as safe_not_equal, f as create_component, m as mount_component, t as transition_in, g as transition_out, j as destroy_component, bo as Apps, ar as handle_promise, D as text, o as space, p as element, q as insert, U as append, Y as listen, at as update_await_block_branch, u as detach, $ as run_all, bN as R_DOMAIN_LOCALHOST, bO as R_DOMAIN_IP, F as noop, E as attr, ab as empty, au as destroy_each, a7 as src_url_equal, a3 as getContext, A as ActionsLine, bP as session_storage_remove, V as Vault, J as ode } from "../../mem.6e57882d.js";
import { S as Screen, b as domlog, d as dm_log, a as System, P as PreRegister, c as Authenticate } from "../../PreRegister.fecb5bd8.js";
const $_EXISTING = Symbol("use-existing-cache");
const H_REGISTRY = {
  [P_PUBLIC_SUFFIX_LIST]: {
    format: "text",
    parse(sx_data) {
      if (!sx_data)
        return $_EXISTING;
      const a_suffixes = [];
      for (let sx_line of sx_data.split(/\n/g)) {
        sx_line = sx_line.replace(/\s+|\/\/.*$/, "");
        if (sx_line)
          a_suffixes.push(sx_line);
      }
      return a_suffixes;
    }
  },
  [P_STARSHELL_DECREES]: {
    format: "json",
    filter(z_data) {
      return z_data.filter((g_decree) => {
        return true;
      });
    }
  }
};
async function put(p_res, g_cache) {
  return await chrome.storage.local.set({ [`@cache:${p_res}`]: g_cache });
}
async function get_cache(p_res) {
  const si_key = `@cache:${p_res}`;
  return await chrome.storage.local.get([si_key])[si_key];
}
class WebResourceCache {
  static async updateAll() {
    for (const p_res in H_REGISTRY) {
      const g_entry = H_REGISTRY[p_res];
      const d_res = await fetch(p_res);
      switch (g_entry.format) {
        case "text": {
          const s_data = await d_res.text();
          const z_parsed = g_entry.parse(s_data);
          if ($_EXISTING === z_parsed)
            continue;
          await put(p_res, {
            etag: d_res.headers.get("etag") ?? "",
            data: s_data
          });
          break;
        }
        case "json": {
          let w_data = await d_res.json();
          if ("filter" in g_entry) {
            w_data = g_entry.filter(w_data);
          }
          await put(p_res, {
            etag: d_res.headers.get("etag") ?? "",
            data: w_data
          });
          break;
        }
      }
    }
  }
  static async get(p_res) {
    return (await get_cache(p_res)).data;
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  return child_ctx;
}
function create_catch_block(ctx) {
  return { c: noop, m: noop, p: noop, d: noop };
}
function create_then_block(ctx) {
  let each_1_anchor;
  let each_value = ctx[11];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert(target, each_1_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 16) {
        each_value = ctx2[11];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_each_block(ctx) {
  let div;
  let input;
  let t0;
  let code;
  let t1_value = ctx[12] + "";
  let t1;
  let t2;
  return {
    c() {
      div = element("div");
      input = element("input");
      t0 = text(" Always allow ");
      code = element("code");
      t1 = text(t1_value);
      t2 = text(" to see StarShell.\n			");
      attr(input, "type", "checkbox");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, input);
      append(div, t0);
      append(div, code);
      append(code, t1);
      append(div, t2);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_pending_block(ctx) {
  return { c: noop, m: noop, p: noop, d: noop };
}
function create_default_slot$2(ctx) {
  let t0;
  let t1_value = ctx[2].host + "";
  let t1;
  let t2;
  let t3;
  let button0;
  let t4;
  let t5;
  let button1;
  let t6;
  let mounted;
  let dispose;
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block,
    then: create_then_block,
    catch: create_catch_block,
    value: 11
  };
  handle_promise(ctx[4](), info);
  return {
    c() {
      t0 = text("Allow ");
      t1 = text(t1_value);
      t2 = text(" to see you have StarShell installed?\n\n	");
      info.block.c();
      t3 = space();
      button0 = element("button");
      t4 = text("Allow");
      t5 = space();
      button1 = element("button");
      t6 = text("Cancel");
      button0.disabled = ctx[1];
      button1.disabled = ctx[1];
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
      insert(target, t2, anchor);
      info.block.m(target, info.anchor = anchor);
      info.mount = () => t3.parentNode;
      info.anchor = t3;
      insert(target, t3, anchor);
      insert(target, button0, anchor);
      append(button0, t4);
      insert(target, t5, anchor);
      insert(target, button1, anchor);
      append(button1, t6);
      if (!mounted) {
        dispose = [
          listen(button0, "click", ctx[7]),
          listen(button1, "click", ctx[8])
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      update_await_block_branch(info, ctx, dirty);
      if (dirty & 2) {
        button0.disabled = ctx[1];
      }
      if (dirty & 2) {
        button1.disabled = ctx[1];
      }
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(t2);
      info.block.d(detaching);
      info.token = null;
      info = null;
      if (detaching)
        detach(t3);
      if (detaching)
        detach(button0);
      if (detaching)
        detach(t5);
      if (detaching)
        detach(button1);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$3(ctx) {
  let screen2;
  let current;
  screen2 = new Screen({
    props: {
      $$slots: { default: [create_default_slot$2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(screen2.$$.fragment);
    },
    m(target, anchor) {
      mount_component(screen2, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const screen_changes = {};
      if (dirty & 32771) {
        screen_changes.$$scope = { dirty, ctx: ctx2 };
      }
      screen2.$set(screen_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(screen2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(screen2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(screen2, detaching);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { k_page } = $$props;
  let { completed } = $$props;
  let { app } = $$props;
  const g_app = app;
  const p_app = Apps.pathFrom(g_app);
  const s_host = g_app.host;
  let b_busy = false;
  async function allow() {
    if (b_busy)
      return 1;
    $$invalidate(1, b_busy = true);
    const exit = () => ($$invalidate(1, b_busy = false), 1);
    await Apps.open(async (ks_apps) => {
      await ks_apps.put(ks_apps.at(p_app) || g_app);
    });
    completed(true);
    return exit();
  }
  async function parse_domain_parts() {
    await WebResourceCache.get(P_PUBLIC_SUFFIX_LIST);
    let s_etld = "";
    const a_domains = [];
    if (R_DOMAIN_LOCALHOST.test(s_host)) {
      a_domains.push(s_host);
    } else if (g_app.scheme === "https") {
      a_domains.push(s_host);
      if (!R_DOMAIN_IP.test(s_host)) {
        const s_port_suffix = s_host.replace(/^.*(:.+)$/, "$1");
        const a_subs = s_host.replace(/:.+$/, "").split(".");
        for (let i_etld = a_subs.length - 1; i_etld > 0; i_etld--) {
          const s_test = a_subs.slice(i_etld).join(".");
          if (a_subs.includes(s_test)) {
            continue;
          } else {
            s_etld = s_test;
            break;
          }
        }
        a_domains.push("*." + s_etld + s_port_suffix);
      }
    }
    return a_domains;
  }
  const click_handler = () => allow();
  const click_handler_1 = () => completed(false);
  $$self.$$set = ($$props2) => {
    if ("k_page" in $$props2)
      $$invalidate(5, k_page = $$props2.k_page);
    if ("completed" in $$props2)
      $$invalidate(0, completed = $$props2.completed);
    if ("app" in $$props2)
      $$invalidate(6, app = $$props2.app);
  };
  return [
    completed,
    b_busy,
    g_app,
    allow,
    parse_domain_parts,
    k_page,
    app,
    click_handler,
    click_handler_1
  ];
}
class RequestAdvertisement extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { k_page: 5, completed: 0, app: 6 });
  }
}
var Banner_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".backdrop.svelte-1rfq4uw.svelte-1rfq4uw{background-color:black;width:100%;height:172px;display:flex}.backdrop.svelte-1rfq4uw>.text.svelte-1rfq4uw{font-family:Poppins;font-weight:400;font-size:14px;color:var(--theme-color-text-light)}")();
function create_if_block_1(ctx) {
  let div;
  let img;
  let img_src_value;
  let img_alt_value;
  return {
    c() {
      div = element("div");
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = ctx[0].image))
        attr(img, "src", img_src_value);
      attr(img, "alt", img_alt_value = ctx[0].text || "");
      attr(div, "class", "img");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, img);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = `${ctx[0].text}`;
      attr(div, "class", "text svelte-1rfq4uw");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$2(ctx) {
  let div;
  let t;
  let if_block0 = ctx[0].image && create_if_block_1(ctx);
  let if_block1 = ctx[0].text && create_if_block(ctx);
  return {
    c() {
      div = element("div");
      if (if_block0)
        if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      attr(div, "class", "backdrop svelte-1rfq4uw");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block0)
        if_block0.m(div, null);
      append(div, t);
      if (if_block1)
        if_block1.m(div, null);
    },
    p(ctx2, [dirty]) {
      if (ctx2[0].image)
        if_block0.p(ctx2, dirty);
      if (ctx2[0].text)
        if_block1.p(ctx2, dirty);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { display } = $$props;
  const g_display = display;
  let { exits = false } = $$props;
  $$self.$$set = ($$props2) => {
    if ("display" in $$props2)
      $$invalidate(1, display = $$props2.display);
    if ("exits" in $$props2)
      $$invalidate(2, exits = $$props2.exits);
  };
  return [g_display, display, exits];
}
class Banner extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { display: 1, exits: 2 });
  }
}
function create_default_slot$1(ctx) {
  let banner;
  let t0;
  let center;
  let t4;
  let actionsline;
  let current;
  banner = new Banner({
    props: {
      exits: true,
      display: {
        image: ctx[0],
        text: ctx[1].host
      }
    }
  });
  actionsline = new ActionsLine({
    props: {
      back: true,
      confirm: ["Connect", ctx[2]]
    }
  });
  return {
    c() {
      create_component(banner.$$.fragment);
      t0 = space();
      center = element("center");
      center.innerHTML = `<h3>Review permissions</h3> 

		<h4>Allow this site to:</h4>`;
      t4 = space();
      create_component(actionsline.$$.fragment);
    },
    m(target, anchor) {
      mount_component(banner, target, anchor);
      insert(target, t0, anchor);
      insert(target, center, anchor);
      insert(target, t4, anchor);
      mount_component(actionsline, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(banner.$$.fragment, local);
      transition_in(actionsline.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(banner.$$.fragment, local);
      transition_out(actionsline.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(banner, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(center);
      if (detaching)
        detach(t4);
      destroy_component(actionsline, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let screen2;
  let current;
  screen2 = new Screen({
    props: {
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(screen2.$$.fragment);
    },
    m(target, anchor) {
      mount_component(screen2, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const screen_changes = {};
      if (dirty & 32) {
        screen_changes.$$scope = { dirty, ctx: ctx2 };
      }
      screen2.$set(screen_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(screen2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(screen2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(screen2, detaching);
    }
  };
}
function instance$1($$self) {
  const completed = getContext("completed");
  const p_favicon = getContext("faviconSrc");
  const g_app = getContext("app");
  getContext("chains");
  function connect() {
    completed(true);
  }
  return [p_favicon, g_app, connect];
}
class RequestConnection_Permissions extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
function create_default_slot(ctx) {
  let banner;
  let t0;
  let center;
  let t4;
  let actionsline;
  let current;
  banner = new Banner({
    props: {
      display: {
        image: ctx[2],
        text: ctx[1].host
      }
    }
  });
  actionsline = new ActionsLine({
    props: {
      cancel: ctx[4],
      contd: {
        creator: RequestConnection_Permissions,
        props: { accounts: ctx[3] }
      }
    }
  });
  return {
    c() {
      create_component(banner.$$.fragment);
      t0 = space();
      center = element("center");
      center.innerHTML = `<h3>Connect to StarShell</h3> 

		<h4>Select account(s)</h4>`;
      t4 = space();
      create_component(actionsline.$$.fragment);
    },
    m(target, anchor) {
      mount_component(banner, target, anchor);
      insert(target, t0, anchor);
      insert(target, center, anchor);
      insert(target, t4, anchor);
      mount_component(actionsline, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(banner.$$.fragment, local);
      transition_in(actionsline.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(banner.$$.fragment, local);
      transition_out(actionsline.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(banner, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(center);
      if (detaching)
        detach(t4);
      destroy_component(actionsline, detaching);
    }
  };
}
function create_fragment(ctx) {
  let screen2;
  let current;
  screen2 = new Screen({
    props: {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(screen2.$$.fragment);
    },
    m(target, anchor) {
      mount_component(screen2, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const screen_changes = {};
      if (dirty & 256) {
        screen_changes.$$scope = { dirty, ctx: ctx2 };
      }
      screen2.$set(screen_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(screen2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(screen2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(screen2, detaching);
    }
  };
}
function instance($$self) {
  const completed = getContext("completed");
  const g_app = getContext("app");
  const p_favicon = getContext("faviconSrc");
  const a_chains = getContext("chains");
  const i_chain = getContext("chainIndex") || 0;
  a_chains[i_chain];
  let a_accounts = [];
  const func = () => completed(false);
  return [completed, g_app, p_favicon, a_accounts, func];
}
class RequestConnection extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
async function unload() {
  await session_storage_remove("flow");
}
addEventListener("beforeunload", unload);
function open_flow(dc_screen, h_context, g_props) {
  try {
    dm_log.style.display = "none";
  } catch (e_hide) {
  }
  new System({
    target: document.body,
    props: {
      mode: "flow",
      page: {
        creator: dc_screen,
        props: g_props || {}
      }
    },
    context: new Map(ode(h_context))
  });
}
async function authenticate(fk_completed) {
  domlog(`Handling 'authenticate'.`);
  const dk_root = await Vault.getRootKey();
  if (dk_root) {
    domlog(`Vault is already unlocked.`);
    fk_completed(true);
    return;
  }
  const g_root = await Vault.getBase();
  if (!g_root) {
    domlog(`No root found. Prompting registration.`);
    open_flow(PreRegister, {
      completed() {
        void authenticate(fk_completed);
      }
    });
  } else {
    domlog(`Root found. Prompting login.`);
    open_flow(Authenticate, {
      completed: fk_completed
    });
  }
}
const H_HANDLERS_AUTHED = {
  requestAdvertisement(g_value, fk_completed) {
    domlog(`Handling 'requestAdvertisement' on ${JSON.stringify(g_value)}`);
    open_flow(RequestAdvertisement, {}, {
      completed: fk_completed,
      app: g_value.app
    });
  },
  requestConnection(g_value, fk_completed) {
    domlog(`Handling 'requestConnection' on ${JSON.stringify(g_value)}`);
    open_flow(RequestConnection, {
      completed: fk_completed,
      app: g_value.app,
      chains: g_value.chains
    });
  },
  signTransaction(w_value) {
  }
};
async function route_message(g_msg, fk_respond) {
  if (g_msg.type === "authenticate") {
    domlog(`Calling built-in handler for '${g_msg.type}'`);
    return void authenticate((b_answer) => {
      fk_respond(b_answer, g_msg.page);
    });
  }
  const f_handler = H_HANDLERS_AUTHED[g_msg.type];
  if (!f_handler) {
    return domlog(`No such handler registered for '${g_msg.type}'`);
  }
  const dk_root = await Vault.getRootKey();
  if (!dk_root) {
    domlog(`Vault is locked. Redirecting to login.`);
    return void authenticate(() => {
      void route_message(g_msg, fk_respond);
    });
  }
  domlog(`Calling registered handler for '${g_msg.type}'`);
  void f_handler(g_msg["value"], (b_answer) => {
    fk_respond(b_answer, g_msg.page);
  });
}
async function suggest_reload_page(g_page) {
  let g_tab;
  try {
    g_tab = await chrome.tabs.get(g_page.tabId);
  } catch (e_get) {
  }
  if (!g_tab || !g_tab.url)
    return;
  if (g_page.href !== g_tab.url) {
    return;
  }
  return new Promise((fk_resolve) => {
  });
}
(function() {
  domlog("Flow script init");
  const h_query = new URLSearchParams(location.search.slice(1));
  const si_objective = h_query.get("headless");
  if (si_objective) {
    if (si_objective === "info") {
      return chrome.storage.session.set({
        display_info: {
          width: screen.width,
          height: screen.height,
          availHeight: screen.availHeight,
          availWidth: screen.availWidth,
          orientation: screen.orientation,
          devicePixelRatio
        }
      }).then(() => {
        window.close();
      });
    }
    window.close();
  }
  if (h_query.get("comm") === "broadcast") {
    domlog("Using broadcast comm");
    const si_channel = h_query.get("name");
    if (typeof si_channel !== "string" || !si_channel) {
      return domlog("Invalid or missing channel name");
    }
    domlog(`Channel name: '${si_channel}'`);
    const d_broadcast = new BroadcastChannel(si_channel);
    const respond_broadcast = (b_answer, g_page) => {
      d_broadcast.postMessage({
        type: "completeFlow",
        value: {
          answer: b_answer
        }
      });
      setTimeout(async () => {
        if (g_page) {
          await suggest_reload_page(g_page);
        }
        await unload();
        window.close();
      }, 200);
    };
    d_broadcast.onmessage = function(d_event) {
      const g_msg = d_event.data;
      domlog(`Received => ${JSON.stringify(g_msg)}`);
      if (!g_msg || !g_msg.type) {
        return domlog("Invalid message");
      }
      sessionStorage.setItem(si_channel, JSON.stringify(g_msg));
      d_broadcast.postMessage({
        type: "acknowledgeReceipt",
        value: g_msg
      });
      void route_message(g_msg, respond_broadcast);
    };
    domlog("Listening for message...");
    const s_reloaded = sessionStorage.getItem(si_channel);
    if (s_reloaded) {
      domlog("Attempting to restore message after reload...");
      let g_parsed;
      try {
        g_parsed = JSON.parse(s_reloaded);
      } catch (e_parse) {
        return domlog("Failed to parse message from session storage");
      }
      void route_message(g_parsed, respond_broadcast);
    }
  } else {
    domlog(`Unknown comm '${h_query.get("comm") || "(null | undefined)"}'`);
  }
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvdy5hNzBhMjJhYS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3N0b3JlL3dlYi1yZXNvdXJjZS1jYWNoZS50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvc2NyZWVuL1JlcXVlc3RBZHZlcnRpc2VtZW50LnN2ZWx0ZSIsIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvdWkvQmFubmVyLnN2ZWx0ZSIsIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvc2NyZWVuL1JlcXVlc3RDb25uZWN0aW9uX1Blcm1pc3Npb25zLnN2ZWx0ZSIsIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvc2NyZWVuL1JlcXVlc3RDb25uZWN0aW9uLnN2ZWx0ZSIsIi4uLy4uLy4uLy4uLy4uL3NyYy9lbnRyeS9mbG93LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgRGljdCwgSnNvbk9iamVjdCwgSnNvblZhbHVlIH0gZnJvbSAnIy91dGlsL2JlbHQnO1xuXG5pbXBvcnQgU1hfU1VGRklYRVNfQlVORExFRCBmcm9tICcjLy4uL3N1Ym1vZHVsZXMvcHVibGljc3VmZml4LWxpc3QvcHVibGljX3N1ZmZpeF9saXN0LmRhdD9yYXcnO1xuXG5pbXBvcnQge1xuXHRQX1BVQkxJQ19TVUZGSVhfTElTVCxcblx0UF9TVEFSU0hFTExfREVDUkVFUyxcbn0gZnJvbSBcIiMvc2hhcmUvY29uc3RhbnRzXCI7XG5cbmNvbnN0ICRfRVhJU1RJTkcgPSBTeW1ib2woJ3VzZS1leGlzdGluZy1jYWNoZScpO1xuXG50eXBlICRfRVhJU1RJTkcgPSB0eXBlb2YgJF9FWElTVElORztcblxuaW50ZXJmYWNlIEdlbmVyaWNFbnRyeSB7XG5cdHF1ZXJ5PzogKCkgPT4gRGljdDtcbn1cblxuaW50ZXJmYWNlIFRleHRFbnRyeSBleHRlbmRzIEdlbmVyaWNFbnRyeSB7XG5cdGZvcm1hdDogJ3RleHQnO1xuXHRwYXJzZT8oc3hfZGF0YTogc3RyaW5nKTogJF9FWElTVElORyB8IEpzb25WYWx1ZTtcbn1cblxuaW50ZXJmYWNlIEpzb25FbnRyeSBleHRlbmRzIEdlbmVyaWNFbnRyeSB7XG5cdGZvcm1hdDogJ2pzb24nO1xuXHRmaWx0ZXI/KHdfdmFsdWU6IEpzb25WYWx1ZSk6IEpzb25WYWx1ZTtcbn1cblxuaW50ZXJmYWNlIEJpbmFyeUVudHJ5IGV4dGVuZHMgR2VuZXJpY0VudHJ5IHtcblx0Zm9ybWF0OiAnYmluYXJ5Jztcbn1cblxudHlwZSBFbnRyeSA9IFRleHRFbnRyeSB8IEpzb25FbnRyeSB8IEJpbmFyeUVudHJ5O1xuXG5pbnRlcmZhY2UgRGVjcmVlIGV4dGVuZHMgSnNvbk9iamVjdCB7XG5cdGFmZmVjdHM6IHN0cmluZztcblx0YWN0aW9uOiAncmVzdHJpY3QnO1xuXHRzdWdnZXN0aW9uOiAndXBncmFkZSc7XG59XG5cbmNvbnN0IEhfUkVHSVNUUlkgPSB7XG5cdFtQX1BVQkxJQ19TVUZGSVhfTElTVF06IHtcblx0XHRmb3JtYXQ6ICd0ZXh0Jyxcblx0XHRwYXJzZShzeF9kYXRhKTogJF9FWElTVElORyB8IHN0cmluZ1tdIHtcdFxuXHRcdFx0Ly8gZmFpbGVkIGZvciBzb21lIHJlYXNvbjsgbm90IGNyaXRpY2FsXG5cdFx0XHRpZighc3hfZGF0YSkgcmV0dXJuICRfRVhJU1RJTkc7XG5cblx0XHRcdC8vIHBhcnNlIHN1ZmZpeCBsaXN0XG5cdFx0XHRjb25zdCBhX3N1ZmZpeGVzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdFx0Zm9yKGxldCBzeF9saW5lIG9mIHN4X2RhdGEuc3BsaXQoL1xcbi9nKSkge1xuXHRcdFx0XHRzeF9saW5lID0gc3hfbGluZS5yZXBsYWNlKC9cXHMrfFxcL1xcLy4qJC8sICcnKTtcblx0XHRcdFx0aWYoc3hfbGluZSkgYV9zdWZmaXhlcy5wdXNoKHN4X2xpbmUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyByZXR1cm4gc3VmZml4IGxpc3Rcblx0XHRcdHJldHVybiBhX3N1ZmZpeGVzO1xuXHRcdH0sXG5cdH0sXG5cblx0W1BfU1RBUlNIRUxMX0RFQ1JFRVNdOiB7XG5cdFx0Zm9ybWF0OiAnanNvbicsXG5cdFx0ZmlsdGVyKHpfZGF0YTogSnNvblZhbHVlKTogSnNvblZhbHVlIHtcblx0XHRcdHJldHVybiAoel9kYXRhIGFzIERlY3JlZVtdKS5maWx0ZXIoKGdfZGVjcmVlKSA9PiB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSkgYXMgSnNvblZhbHVlO1xuXHRcdH0sXG5cdH0sXG59IGFzIGNvbnN0O1xuXG5cbnR5cGUgQ2FjaGVLZXkgPSBrZXlvZiB0eXBlb2YgSF9SRUdJU1RSWTtcblxuaW50ZXJmYWNlIENhY2hlIHtcblx0ZXRhZzogc3RyaW5nO1xuXHRkYXRhOiBKc29uVmFsdWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHB1dChwX3JlczogQ2FjaGVLZXksIGdfY2FjaGU6IENhY2hlKSB7XG5cdHJldHVybiBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe1tgQGNhY2hlOiR7cF9yZXN9YF06Z19jYWNoZX0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRfY2FjaGUocF9yZXM6IENhY2hlS2V5KTogUHJvbWlzZTxDYWNoZT4ge1xuXHRjb25zdCBzaV9rZXkgPSBgQGNhY2hlOiR7cF9yZXN9YDtcblxuXHRyZXR1cm4gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtzaV9rZXldKVtzaV9rZXldO1xufVxuXG5leHBvcnQgY2xhc3MgV2ViUmVzb3VyY2VDYWNoZSB7XG5cdHN0YXRpYyBhc3luYyB1cGRhdGVBbGwoKSB7XG5cdFx0Zm9yKGNvbnN0IHBfcmVzIGluIEhfUkVHSVNUUlkpIHtcblx0XHRcdGNvbnN0IGdfZW50cnkgPSBIX1JFR0lTVFJZW3BfcmVzIGFzIENhY2hlS2V5XTtcblxuXHRcdFx0Ly8gLy8gYnVpbGQgcXVlcnlcblx0XHRcdC8vIGlmKCdxdWVyeScgaW4gZ19lbnRyeSkge1xuXHRcdFx0Ly8gXHRjb25zdCBnX3F1ZXJ5ID0gZ19lbnRyeS5xdWVyeSgpO1xuXHRcdFx0Ly8gXHRpZihnX3F1ZXJ5ICYmICdvYmplY3QnID09PSB0eXBlb2YgZ19xdWVyeSkge1xuXHRcdFx0Ly8gXHRcdGNvbnN0IHN4X3BhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoZ19xdWVyeSkudG9TdHJpbmcoKTtcblx0XHRcdC8vIFx0fVxuXHRcdFx0Ly8gfVxuXG5cdFx0XHQvLyBmZXRjaCB0aGUgcmVzb3VyY2Vcblx0XHRcdGNvbnN0IGRfcmVzID0gYXdhaXQgZmV0Y2gocF9yZXMpO1xuXG5cdFx0XHQvLyBkZXBlbmRpbmcgb24gZm9ybWF0XG5cdFx0XHRzd2l0Y2goZ19lbnRyeS5mb3JtYXQpIHtcblx0XHRcdFx0Ly8gbG9hZCByZXNwb25zZSBhcyB0ZXh0XG5cdFx0XHRcdGNhc2UgJ3RleHQnOiB7XG5cdFx0XHRcdFx0Y29uc3Qgc19kYXRhID0gYXdhaXQgZF9yZXMudGV4dCgpO1xuXG5cdFx0XHRcdFx0Ly8gcGFyc2UgdGhlIHRleHR1YWwgZGF0YVxuXHRcdFx0XHRcdGNvbnN0IHpfcGFyc2VkID0gZ19lbnRyeS5wYXJzZShzX2RhdGEpO1xuXG5cdFx0XHRcdFx0Ly8gZG8gbm90IHVwZGF0ZSBhbnl0aGluZ1xuXHRcdFx0XHRcdGlmKCRfRVhJU1RJTkcgPT09IHpfcGFyc2VkKSBjb250aW51ZTtcblxuXHRcdFx0XHRcdC8vIHNldC9vdmVyd3JpdGVcblx0XHRcdFx0XHRhd2FpdCBwdXQocF9yZXMgYXMgQ2FjaGVLZXksIHtcblx0XHRcdFx0XHRcdGV0YWc6IGRfcmVzLmhlYWRlcnMuZ2V0KCdldGFnJykgPz8gJycsXG5cdFx0XHRcdFx0XHRkYXRhOiBzX2RhdGEsXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBsb2FkIHJlc3BvbnNlIGFzIGpzb25cblx0XHRcdFx0Y2FzZSAnanNvbic6IHtcblx0XHRcdFx0XHRsZXQgd19kYXRhOiBKc29uVmFsdWUgPSBhd2FpdCBkX3Jlcy5qc29uKCk7XG5cblx0XHRcdFx0XHQvLyBhcHBseSBmaWx0ZXJcblx0XHRcdFx0XHRpZignZmlsdGVyJyBpbiBnX2VudHJ5KSB7XG5cdFx0XHRcdFx0XHR3X2RhdGEgPSBnX2VudHJ5LmZpbHRlcih3X2RhdGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIHNldC9vdmVyd3JpdGVcblx0XHRcdFx0XHRhd2FpdCBwdXQocF9yZXMgYXMgQ2FjaGVLZXksIHtcblx0XHRcdFx0XHRcdGV0YWc6IGRfcmVzLmhlYWRlcnMuZ2V0KCdldGFnJykgPz8gJycsXG5cdFx0XHRcdFx0XHRkYXRhOiB3X2RhdGEsXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgZ2V0KHBfcmVzOiBDYWNoZUtleSk6IFByb21pc2U8SnNvblZhbHVlPiB7XG5cdFx0cmV0dXJuIChhd2FpdCBnZXRfY2FjaGUocF9yZXMpKS5kYXRhO1xuXHR9XG59XG4iLCI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgeyBTY3JlZW4sIHR5cGUgUGFnZSB9IGZyb20gJy4vX3NjcmVlbnMnO1xuXHRpbXBvcnQgeyBWYXVsdCB9IGZyb20gJyMvY3J5cHRvL3ZhdWx0JztcblxuXHRpbXBvcnQgdHlwZSB7IEFwcCB9IGZyb20gJyMvbWV0YS9hcHAnO1xuXHRpbXBvcnQgeyBBcHBzIH0gZnJvbSAnIy9zdG9yZS9hcHBzJztcblxuXHRpbXBvcnQgeyBvbk1vdW50fSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgeyBQX1BVQkxJQ19TVUZGSVhfTElTVCwgUl9ET01BSU5fSVAsIFJfRE9NQUlOX0xPQ0FMSE9TVCB9IGZyb20gJyMvc2hhcmUvY29uc3RhbnRzJztcblx0aW1wb3J0IHR5cGUgeyBDb21wbGV0ZWQgfSBmcm9tICcjL2VudHJ5L2Zsb3cnO1xuXHRpbXBvcnQgeyBXZWJSZXNvdXJjZUNhY2hlIH0gZnJvbSAnIy9zdG9yZS93ZWItcmVzb3VyY2UtY2FjaGUnO1xuXG5cdGltcG9ydCAnIy9jaGFpbi9tYWluJztcblxuXHRcblx0ZXhwb3J0IGxldCBrX3BhZ2U6IFBhZ2U7XG5cblx0ZXhwb3J0IGxldCBjb21wbGV0ZWQ6IENvbXBsZXRlZDtcblxuXHRleHBvcnQgbGV0IGFwcDogQXBwWydpbnRlcmZhY2UnXTtcblx0Y29uc3QgZ19hcHAgPSBhcHA7XG5cblx0Ly8gZGVyaXZlIHBhdGggZnJvbSBhcHAgc3RydWN0XG5cdGNvbnN0IHBfYXBwID0gQXBwcy5wYXRoRnJvbShnX2FwcCk7XG5cblx0Ly8gcmVmIGhvc3Rcblx0Y29uc3Qgc19ob3N0ID0gZ19hcHAuaG9zdDtcblxuXG5cdC8qXG5cblx0QXBwc1N0b3JlLnN1YnNjcmliZSgoa3NfYXBwcykgPT4ge1xuXHRcdGNvbnN0IHBfYXBwID0ga3NfYXBwcy5wYXRoRm9yKGdfYXBwKTtcblxuXHQqL1xuXG5cdGxldCBiX2J1c3kgPSBmYWxzZTtcblxuXHRhc3luYyBmdW5jdGlvbiBhbGxvdygpOiBQcm9taXNlPDE+IHtcblx0XHQvLyBkbyBub3QgaW50ZXJ1cHQ7IGxvY2tcblx0XHRpZihiX2J1c3kpIHJldHVybiAxOyBiX2J1c3kgPSB0cnVlO1xuXG5cdFx0Ly8gcHJlcCBncmFjZWZ1bCBleGl0XG5cdFx0Y29uc3QgZXhpdCA9ICgpOiAxID0+IChiX2J1c3kgPSBmYWxzZSwgMSk7XG5cblx0XHQvLyBzYXZlIGFwcCBkZWYgdG8gc3RvcmFnZVxuXHRcdGF3YWl0IEFwcHMub3Blbihhc3luYyhrc19hcHBzKSA9PiB7XG5cdFx0XHRhd2FpdCBrc19hcHBzLnB1dChrc19hcHBzLmF0KHBfYXBwKSB8fCBnX2FwcCk7XG5cdFx0fSk7XG5cblx0XHQvLyBkb25lXG5cdFx0Y29tcGxldGVkKHRydWUpO1xuXHRcdHJldHVybiBleGl0KCk7XG5cdH1cblxuXHRhc3luYyBmdW5jdGlvbiBwYXJzZV9kb21haW5fcGFydHMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuXHRcdC8vIGZldGNoIHRoZSBjYWNoZWQgc3VmZml4IGxpc3Rcblx0XHRjb25zdCBhX3N1ZmZpeGVzID0gYXdhaXQgV2ViUmVzb3VyY2VDYWNoZS5nZXQoUF9QVUJMSUNfU1VGRklYX0xJU1QpO1xuXG5cdFx0Ly8gcHJlcCBldGxkXG5cdFx0bGV0IHNfZXRsZCA9ICcnO1xuXG5cdFx0Ly8gbGlzdCBvZiBkb21haW5zIHRvIGNvbnNpZGVyIGZvciBuZXcgdXNlciBwb2xpY3lcblx0XHRjb25zdCBhX2RvbWFpbnM6IHN0cmluZ1tdID0gW107XG5cblx0XHQvLyBsb2NhbGhvc3Rcblx0XHRpZihSX0RPTUFJTl9MT0NBTEhPU1QudGVzdChzX2hvc3QpKSB7XG5cdFx0XHQvLyBmdWxsIGRvbWFpblxuXHRcdFx0YV9kb21haW5zLnB1c2goc19ob3N0KTtcblx0XHR9XG5cdFx0Ly8gc2VjdXJlIGNvbnRleHRcblx0XHRlbHNlIGlmKCdodHRwcycgPT09IGdfYXBwLnNjaGVtZSkge1xuXHRcdFx0Ly8gZnVsbCBkb21haW5cblx0XHRcdGFfZG9tYWlucy5wdXNoKHNfaG9zdCk7XG5cblx0XHRcdC8vIG5vdCBhbiBpcCBhZGRyZXNzXG5cdFx0XHRpZighUl9ET01BSU5fSVAudGVzdChzX2hvc3QpKSB7XG5cdFx0XHRcdC8vIGV4dHJhY3QgcG9ydCBzdWZmaXggaWYgYW55XG5cdFx0XHRcdGNvbnN0IHNfcG9ydF9zdWZmaXggPSBzX2hvc3QucmVwbGFjZSgvXi4qKDouKykkLywgJyQxJyk7XG5cblx0XHRcdFx0Ly8gc3BsaXQgaG9zdG5hbWVcblx0XHRcdFx0Y29uc3QgYV9zdWJzID0gc19ob3N0LnJlcGxhY2UoLzouKyQvLCAnJykuc3BsaXQoJy4nKTtcblxuXHRcdFx0XHQvLyBlYWNoIHBhcnQgb2YgdGhlIGRvbWFpblxuXHRcdFx0XHRmb3IobGV0IGlfZXRsZD1hX3N1YnMubGVuZ3RoLTE7IGlfZXRsZD4wOyBpX2V0bGQtLSkge1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBldGxkIHRlc3Rcblx0XHRcdFx0XHRjb25zdCBzX3Rlc3QgPSBhX3N1YnMuc2xpY2UoaV9ldGxkKS5qb2luKCcuJyk7XG5cblx0XHRcdFx0XHQvLyBpcyBhIHJlZ3NpdGVyZWQgcHVibGljIHN1ZmZpeFxuXHRcdFx0XHRcdGlmKGFfc3Vicy5pbmNsdWRlcyhzX3Rlc3QpKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gcmVhY2hlZCB0aGUgZW5kIG9mIHRoZSBldGxkXG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRzX2V0bGQgPSBzX3Rlc3Q7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBvcmctbGV2ZWwgZG9tYWluXG5cdFx0XHRcdGFfZG9tYWlucy5wdXNoKCcqLicrc19ldGxkK3NfcG9ydF9zdWZmaXgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIGFuc3dlclxuXHRcdHJldHVybiBhX2RvbWFpbnM7XG5cdH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cImxlc3NcIj5cblx0XG48L3N0eWxlPlxuXG48U2NyZWVuPlxuXHRBbGxvdyB7Z19hcHAuaG9zdH0gdG8gc2VlIHlvdSBoYXZlIFN0YXJTaGVsbCBpbnN0YWxsZWQ/XG5cblx0eyNhd2FpdCBwYXJzZV9kb21haW5fcGFydHMoKSB0aGVuIGFfZG9tYWluc31cblx0XHR7I2VhY2ggYV9kb21haW5zIGFzIHNfcGF0dGVybn1cblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj4gQWx3YXlzIGFsbG93IDxjb2RlPntzX3BhdHRlcm59PC9jb2RlPiB0byBzZWUgU3RhclNoZWxsLlxuXHRcdFx0PC9kaXY+XG5cdFx0ey9lYWNofVxuXHR7L2F3YWl0fVxuXG5cdDxidXR0b24gZGlzYWJsZWQ9e2JfYnVzeX0gb246Y2xpY2s9eygpID0+IGFsbG93KCl9PkFsbG93PC9idXR0b24+XG5cdDxidXR0b24gZGlzYWJsZWQ9e2JfYnVzeX0gb246Y2xpY2s9eygpID0+IGNvbXBsZXRlZChmYWxzZSl9PkNhbmNlbDwvYnV0dG9uPlxuPC9TY3JlZW4+XG4iLCI8c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIiBsYW5nPVwidHNcIj5cblx0ZXhwb3J0IHR5cGUgRGlzcGxheUNvbmZpZyA9IHtcblx0XHRpbWFnZTogc3RyaW5nO1xuXHRcdHRleHQ/OiBzdHJpbmc7XG5cdH07XG48L3NjcmlwdD5cblxuPHNjcmlwdCBsYW5nPVwidHNcIj5cblxuXHRleHBvcnQgbGV0IGRpc3BsYXk6IERpc3BsYXlDb25maWc7XG5cdGNvbnN0IGdfZGlzcGxheSA9IGRpc3BsYXk7XG5cblx0ZXhwb3J0IGxldCBleGl0cyA9IGZhbHNlO1xuXHRjb25zdCBiX2V4aXRzID0gZXhpdHM7XG5cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cImxlc3NcIj5cblx0QGltcG9ydCAnLi9fYmFzZS5sZXNzJztcblxuXHQuYmFja2Ryb3Age1xuXHRcdGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuXHRcdHdpZHRoOiAxMDAlO1xuXHRcdGhlaWdodDogMTcycHg7XG5cblx0XHRkaXNwbGF5OiBmbGV4O1xuXG5cdFx0Jj4uaW1nIHtcblxuXHRcdH1cblxuXHRcdCY+LnRleHQge1xuXHRcdFx0LmZvbnQocmVndWxhcik7XG5cdFx0XHRjb2xvcjogdmFyKC0tdGhlbWUtY29sb3ItdGV4dC1saWdodCk7XG5cdFx0fVxuXHR9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwiYmFja2Ryb3BcIj5cblx0eyNpZiBnX2Rpc3BsYXkuaW1hZ2V9XG5cdFx0PGRpdiBjbGFzcz1cImltZ1wiPlxuXHRcdFx0PGltZyBzcmM9e2dfZGlzcGxheS5pbWFnZX0gYWx0PXtnX2Rpc3BsYXkudGV4dCB8fCAnJ30gLz5cblx0XHQ8L2Rpdj5cblx0ey9pZn1cblxuXHR7I2lmIGdfZGlzcGxheS50ZXh0fVxuXHRcdDxkaXYgY2xhc3M9XCJ0ZXh0XCI+XG5cdFx0XHR7Z19kaXNwbGF5LnRleHR9XG5cdFx0PC9kaXY+XG5cdHsvaWZ9XG48L2Rpdj5cbiIsIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCB7IFNjcmVlbiwgSGVhZGVyLCB0eXBlIFBhZ2UgfSBmcm9tICcuL19zY3JlZW5zJztcblxuXHRpbXBvcnQgdHlwZSB7IENvbXBsZXRlZCB9IGZyb20gJyMvZW50cnkvZmxvdyc7XG5cdGltcG9ydCB0eXBlIHsgQXBwIH0gZnJvbSAnIy9tZXRhL2FwcCc7XG5cdGltcG9ydCB0eXBlIHsgQ2hhaW5EZXNjcmlwdG9yIH0gZnJvbSAnIy9zY3JpcHQvY29tbW9uJztcblx0aW1wb3J0IEJhbm5lciBmcm9tICcuLi91aS9CYW5uZXIuc3ZlbHRlJztcblx0aW1wb3J0IEFjdGlvbnNMaW5lIGZyb20gJy4uL3VpL0FjdGlvbnNMaW5lLnN2ZWx0ZSc7XG5pbXBvcnQgeyBnZXRDb250ZXh0IH0gZnJvbSAnc3ZlbHRlJztcblxuXG5cdGNvbnN0IGNvbXBsZXRlZCA9IGdldENvbnRleHQ8Q29tcGxldGVkPignY29tcGxldGVkJyk7XG5cblx0Y29uc3QgcF9mYXZpY29uID0gZ2V0Q29udGV4dDxzdHJpbmc+KCdmYXZpY29uU3JjJyk7XG5cdGNvbnN0IGdfYXBwID0gZ2V0Q29udGV4dDxBcHBbJ2ludGVyZmFjZSddPignYXBwJyk7XG5cblx0Y29uc3QgYV9jaGFpbnMgPSBnZXRDb250ZXh0PENoYWluRGVzY3JpcHRvcltdPignY2hhaW5zJyk7XG5cblx0ZnVuY3Rpb24gY29ubmVjdCgpIHtcblx0XHRjb21wbGV0ZWQodHJ1ZSk7XG5cdH1cbjwvc2NyaXB0PlxuXG48U2NyZWVuPlxuXHQ8QmFubmVyIGV4aXRzIGRpc3BsYXk9e3tcblx0XHRpbWFnZTogcF9mYXZpY29uLFxuXHRcdHRleHQ6IGdfYXBwLmhvc3QsXG5cdH19IC8+XG5cblx0PGNlbnRlcj5cblx0XHQ8aDM+XG5cdFx0XHRSZXZpZXcgcGVybWlzc2lvbnNcblx0XHQ8L2gzPlxuXG5cdFx0PGg0PlxuXHRcdFx0QWxsb3cgdGhpcyBzaXRlIHRvOlxuXHRcdDwvaDQ+XG5cdDwvY2VudGVyPlxuXG5cdFxuXG5cdDxBY3Rpb25zTGluZSBiYWNrIGNvbmZpcm09e1snQ29ubmVjdCcsIGNvbm5lY3RdfSAvPlxuPC9TY3JlZW4+XG4iLCI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgeyBTY3JlZW4sIEhlYWRlciwgdHlwZSBQYWdlIH0gZnJvbSAnLi9fc2NyZWVucyc7XG5cblx0aW1wb3J0IHR5cGUgeyBDb21wbGV0ZWQgfSBmcm9tICcjL2VudHJ5L2Zsb3cnO1xuXHRpbXBvcnQgdHlwZSB7IEFwcCB9IGZyb20gJyMvbWV0YS9hcHAnO1xuXHRpbXBvcnQgdHlwZSB7IENoYWluRGVzY3JpcHRvciB9IGZyb20gJyMvc2NyaXB0L2NvbW1vbic7XG5cdGltcG9ydCBCYW5uZXIgZnJvbSAnLi4vdWkvQmFubmVyLnN2ZWx0ZSc7XG5cdGltcG9ydCBBY3Rpb25zTGluZSBmcm9tICcuLi91aS9BY3Rpb25zTGluZS5zdmVsdGUnO1xuXHRpbXBvcnQgUmVxdWVzdENvbm5lY3Rpb25QZXJtaXNzaW9ucyBmcm9tICcuL1JlcXVlc3RDb25uZWN0aW9uX1Blcm1pc3Npb25zLnN2ZWx0ZSc7XG5cdGltcG9ydCB7IGdldENvbnRleHQgfSBmcm9tICdzdmVsdGUnO1xuXG5cdGNvbnN0IGNvbXBsZXRlZCA9IGdldENvbnRleHQ8Q29tcGxldGVkPignY29tcGxldGVkJyk7XG5cblx0Y29uc3QgZ19hcHAgPSBnZXRDb250ZXh0PEFwcFsnaW50ZXJmYWNlJ10+KCdhcHAnKTtcblx0Y29uc3QgcF9mYXZpY29uID0gZ2V0Q29udGV4dDxzdHJpbmc+KCdmYXZpY29uU3JjJyk7XG5cblx0Ly8gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwke3N4X3BuZ31gXG5cblx0Y29uc3QgYV9jaGFpbnMgPSBnZXRDb250ZXh0PENoYWluRGVzY3JpcHRvcltdPignY2hhaW5zJyk7XG5cdGNvbnN0IGlfY2hhaW4gPSBnZXRDb250ZXh0PG51bWJlcj4oJ2NoYWluSW5kZXgnKSB8fCAwO1xuXHRjb25zdCBnX2NoYWluID0gYV9jaGFpbnNbaV9jaGFpbl07XG5cblx0Ly8gc2VsZWN0ZWQgYWNjb3VudHMgdG8gYXBwbHkgdGhlIGNvbm5lY3Rpb24gdG9cblx0bGV0IGFfYWNjb3VudHMgPSBbXTtcbjwvc2NyaXB0PlxuXG48U2NyZWVuPlxuXHQ8QmFubmVyIGRpc3BsYXk9e3tcblx0XHRpbWFnZTogcF9mYXZpY29uLFxuXHRcdHRleHQ6IGdfYXBwLmhvc3QsXG5cdH19IC8+XG5cblx0PGNlbnRlcj5cblx0XHQ8aDM+XG5cdFx0XHRDb25uZWN0IHRvIFN0YXJTaGVsbFxuXHRcdDwvaDM+XG5cblx0XHQ8aDQ+XG5cdFx0XHRTZWxlY3QgYWNjb3VudChzKVxuXHRcdDwvaDQ+XG5cdDwvY2VudGVyPlxuXG5cdDwhLS0gPFJvd3MgLS0+XG5cblx0PEFjdGlvbnNMaW5lIGNhbmNlbD17KCkgPT4gY29tcGxldGVkKGZhbHNlKX0gY29udGQ9e3tcblx0XHRjcmVhdG9yOiBSZXF1ZXN0Q29ubmVjdGlvblBlcm1pc3Npb25zLFxuXHRcdHByb3BzOiB7XG5cdFx0XHRhY2NvdW50czogYV9hY2NvdW50cyxcblx0XHR9LFxuXHR9fSAvPlxuPC9TY3JlZW4+XG4iLCJpbXBvcnQgU3lzdGVtU3ZlbHRlIGZyb20gJyMjL2NvbnRhaW5lci9TeXN0ZW0uc3ZlbHRlJztcbmltcG9ydCBCbGFua1N2ZWx0ZSBmcm9tICcjIy9zY3JlZW4vQmxhbmsuc3ZlbHRlJztcbmltcG9ydCBBdXRoZW50aWNhdGVTdmVsdGUgZnJvbSAnIyMvc2NyZWVuL0F1dGhlbnRpY2F0ZS5zdmVsdGUnO1xuaW1wb3J0IFJlZ2lzdGVyU3ZlbHRlIGZyb20gJyMjL3NjcmVlbi9SZWdpc3Rlci5zdmVsdGUnO1xuXG5pbXBvcnQgUmVxdWVzdEFkdmVydGlzZW1lbnRTdmVsdGUgZnJvbSAnIyMvc2NyZWVuL1JlcXVlc3RBZHZlcnRpc2VtZW50LnN2ZWx0ZSc7XG5pbXBvcnQgUmVxdWVzdENvbm5lY3Rpb25TdmVsdGUgZnJvbSAnIyMvc2NyZWVuL1JlcXVlc3RDb25uZWN0aW9uLnN2ZWx0ZSc7XG5cbmltcG9ydCB7IHNlc3Npb25fc3RvcmFnZV9yZW1vdmUsIFZhdWx0IH0gZnJvbSAnIy9jcnlwdG8vdmF1bHQnO1xuaW1wb3J0IHR5cGUgeyBWb2NhYiB9IGZyb20gJyMvbWV0YS92b2NhYic7XG5pbXBvcnQgdHlwZSB7IEludHJhRXh0IH0gZnJvbSAnIy9zY3JpcHQvbWVzc2FnZXMnO1xuaW1wb3J0IHsgZGQsIHFzIH0gZnJvbSAnIy91dGlsL2RvbSc7XG5pbXBvcnQgdHlwZSB7IFVuaW9uIH0gZnJvbSAndHMtdG9vbGJlbHQnO1xuaW1wb3J0IHR5cGUgeyBQYXJhbWV0cmljU3ZlbHRlQ29uc3RydWN0b3IgfSBmcm9tICcjL21ldGEvc3ZlbHRlJztcbmltcG9ydCB7IGRtX2xvZywgZG9tbG9nIH0gZnJvbSAnLi9mYWxsYmFjayc7XG5pbXBvcnQgdHlwZSB7IFBsYWluT2JqZWN0IH0gZnJvbSAnIy9tZXRhL2JlbHQnO1xuaW1wb3J0IHR5cGUgeyBTdmVsdGVDb21wb25lbnQgfSBmcm9tICdzdmVsdGUnO1xuaW1wb3J0IHsgb2RlIH0gZnJvbSAnIy91dGlsL2JlbHQnO1xuaW1wb3J0IFByZVJlZ2lzdGVyIGZyb20gJyMvYXBwL3NjcmVlbi9QcmVSZWdpc3Rlci5zdmVsdGUnO1xuXG5leHBvcnQgdHlwZSBGbG93TWVzc2FnZSA9IFZvY2FiLk1lc3NhZ2U8SW50cmFFeHQuRmxvd1ZvY2FiPjtcblxuZXhwb3J0IHR5cGUgUGFnZSA9IFVuaW9uLk1lcmdlPE5vbk51bGxhYmxlPFZvY2FiLk1lc3NhZ2VQYXJ0PEludHJhRXh0LkZsb3dWb2NhYiwgJ3BhZ2UnPj4+O1xuXG5cbmV4cG9ydCB0eXBlIENvbXBsZXRlZCA9IChiX2Fuc3dlcjogYm9vbGVhbikgPT4gdm9pZDtcblxuZXhwb3J0IHR5cGUgQ29tcGxldGlvblJlc3BvbnNlID0gKGJfYW5zd2VyOiBib29sZWFuLCBnX3BhZ2U6IG51bGwgfCBQYWdlKSA9PiB2b2lkO1xuXG5cbi8vIGJlZm9yZSB0aGlzIHdpbmRvdyBpcyB1bmxvYWRlZFxuYXN5bmMgZnVuY3Rpb24gdW5sb2FkKCkge1xuXHQvLyBjbGVhciB0aGUgZmxvdyB2YWx1ZSBmcm9tIHNlc3Npb24gc3RvcmFnZVxuXHRhd2FpdCBzZXNzaW9uX3N0b3JhZ2VfcmVtb3ZlKCdmbG93Jyk7XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbWlzdXNlZC1wcm9taXNlc1xuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgdW5sb2FkKTtcblxuLy8gdG9wLWxldmVsIHN5c3RlbSBjb21wb25lbnRcbmxldCB5Y19zeXN0ZW06IFN2ZWx0ZUNvbXBvbmVudCB8IG51bGwgPSBudWxsO1xuXG5mdW5jdGlvbiBvcGVuX2Zsb3c8XG5cdGRjX3NjcmVlbiBleHRlbmRzIFBhcmFtZXRyaWNTdmVsdGVDb25zdHJ1Y3Rvcixcbj4oZGNfc2NyZWVuOiBkY19zY3JlZW4sIGhfY29udGV4dDogUGxhaW5PYmplY3QsIGdfcHJvcHM/OiBPbWl0PFBhcmFtZXRyaWNTdmVsdGVDb25zdHJ1Y3Rvci5QYXJ0czxkY19zY3JlZW4+WydwYXJhbXMnXSwgJ2tfcGFnZSc+KSB7XG5cdC8vIGF0dGVtcHQgdG8gaGlkZSBsb2dcblx0dHJ5IHtcblx0XHRkbV9sb2chLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdH1cblx0Y2F0Y2goZV9oaWRlKSB7fVxuXG5cdC8vIGRlc3Ryb3kgcHJldmlvdXMgc3lzdGVtXG5cdGlmKHljX3N5c3RlbSkge1xuXHRcdHRyeSB7XG5cdFx0XHR5Y19zeXN0ZW0uJGRlc3Ryb3koKTtcblx0XHR9XG5cdFx0Y2F0Y2goZV9kZXN0cm95KSB7fVxuXG5cdFx0dHJ5IHtcblx0XHRcdHFzKGRvY3VtZW50LmJvZHksICdtYWluJyk/LnJlbW92ZSgpO1xuXHRcdH1cblx0XHRjYXRjaChlX3JlbW92ZSkge31cblx0fVxuXG5cdC8vIGNyZWF0ZSBzeXN0ZW1cblx0bmV3IFN5c3RlbVN2ZWx0ZSh7XG5cdFx0dGFyZ2V0OiBkb2N1bWVudC5ib2R5LFxuXHRcdHByb3BzOiB7XG5cdFx0XHRtb2RlOiAnZmxvdycsXG5cdFx0XHRwYWdlOiB7XG5cdFx0XHRcdGNyZWF0b3I6IGRjX3NjcmVlbixcblx0XHRcdFx0cHJvcHM6IGdfcHJvcHMgfHwge30sXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0Y29udGV4dDogbmV3IE1hcChvZGUoaF9jb250ZXh0KSksXG5cdH0pO1xufVxuXG5cbi8vIGF1dGhlbnRpY2F0ZSB0aGUgdXNlclxuYXN5bmMgZnVuY3Rpb24gYXV0aGVudGljYXRlKGZrX2NvbXBsZXRlZDogQ29tcGxldGVkKSB7XG5cdC8vIHZlcmJvc2Vcblx0ZG9tbG9nKGBIYW5kbGluZyAnYXV0aGVudGljYXRlJy5gKTtcblxuXHQvLyBjaGVjayBpZiByb290IGtleSBpcyBhY2Nlc3NpYmxlXG5cdGNvbnN0IGRrX3Jvb3QgPSBhd2FpdCBWYXVsdC5nZXRSb290S2V5KCk7XG5cblx0Ly8gYWxyZWFkeSBzaWduZWQgaW5cblx0aWYoZGtfcm9vdCkge1xuXHRcdC8vIHZlcmJvc2Vcblx0XHRkb21sb2coYFZhdWx0IGlzIGFscmVhZHkgdW5sb2NrZWQuYCk7XG5cblx0XHQvLyBUT0RPOiBjb25zaWRlciBcImFscmVhZHkgYXV0aGVudGljYXRlZFwiIGRvbVxuXHRcdC8vIG9wZW5fZmxvdyhCbGFua1N2ZWx0ZSwge30pO1xuXG5cdFx0Ly8gY2FsbGJhY2tcblx0XHRma19jb21wbGV0ZWQodHJ1ZSk7XG5cblx0XHQvLyBleGl0XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gcmV0cmlldmUgcm9vdFxuXHRjb25zdCBnX3Jvb3QgPSBhd2FpdCBWYXVsdC5nZXRCYXNlKCk7XG5cblx0Ly8gbm8gcm9vdCBzZXQsIG5lZWQgdG8gcmVnaXN0ZXJcblx0aWYoIWdfcm9vdCkge1xuXHRcdC8vIHZlcmJvc2Vcblx0XHRkb21sb2coYE5vIHJvb3QgZm91bmQuIFByb21wdGluZyByZWdpc3RyYXRpb24uYCk7XG5cblx0XHRvcGVuX2Zsb3coUHJlUmVnaXN0ZXIsIHtcblx0XHRcdGNvbXBsZXRlZCgpIHtcblx0XHRcdFx0dm9pZCBhdXRoZW50aWNhdGUoZmtfY29tcGxldGVkKTtcblx0XHRcdH0sXG5cdFx0fSk7XG5cdH1cblx0Ly8gcm9vdCBpcyBzZXQsIGxvZ2luXG5cdGVsc2Uge1xuXHRcdC8vIHZlcmJvc2Vcblx0XHRkb21sb2coYFJvb3QgZm91bmQuIFByb21wdGluZyBsb2dpbi5gKTtcblxuXHRcdG9wZW5fZmxvdyhBdXRoZW50aWNhdGVTdmVsdGUsIHtcblx0XHRcdGNvbXBsZXRlZDogZmtfY29tcGxldGVkLFxuXHRcdH0pO1xuXHR9XG59XG5cblxuLy8gcHJlcCBoYW5kbGVyc1xuY29uc3QgSF9IQU5ETEVSU19BVVRIRUQ6IFZvY2FiLkhhbmRsZXJzPE9taXQ8SW50cmFFeHQuRmxvd1ZvY2FiLCAnYXV0aGVudGljYXRlJz4sIFtDb21wbGV0ZWRdPiA9IHtcblx0cmVxdWVzdEFkdmVydGlzZW1lbnQoZ192YWx1ZSwgZmtfY29tcGxldGVkKSB7XG5cdFx0Ly8gdmVyYm9zZVxuXHRcdGRvbWxvZyhgSGFuZGxpbmcgJ3JlcXVlc3RBZHZlcnRpc2VtZW50JyBvbiAke0pTT04uc3RyaW5naWZ5KGdfdmFsdWUpfWApO1xuXG5cdFx0b3Blbl9mbG93KFJlcXVlc3RBZHZlcnRpc2VtZW50U3ZlbHRlLCB7fSwge1xuXHRcdFx0Y29tcGxldGVkOiBma19jb21wbGV0ZWQsXG5cdFx0XHRhcHA6IGdfdmFsdWUuYXBwLFxuXHRcdH0pO1xuXHR9LFxuXG5cdHJlcXVlc3RDb25uZWN0aW9uKGdfdmFsdWUsIGZrX2NvbXBsZXRlZCkge1xuXHRcdC8vIHZlcmJvc2Vcblx0XHRkb21sb2coYEhhbmRsaW5nICdyZXF1ZXN0Q29ubmVjdGlvbicgb24gJHtKU09OLnN0cmluZ2lmeShnX3ZhbHVlKX1gKTtcblxuXHRcdG9wZW5fZmxvdyhSZXF1ZXN0Q29ubmVjdGlvblN2ZWx0ZSwge1xuXHRcdFx0Y29tcGxldGVkOiBma19jb21wbGV0ZWQsXG5cdFx0XHRhcHA6IGdfdmFsdWUuYXBwLFxuXHRcdFx0Y2hhaW5zOiBnX3ZhbHVlLmNoYWlucyxcblx0XHR9KTtcblx0fSxcblxuXHRzaWduVHJhbnNhY3Rpb24od192YWx1ZSkge1xuXG5cdH0sXG59IGFzIGNvbnN0O1xuXG5cbi8vIG1lc3NhZ2Ugcm91dGVyXG5hc3luYyBmdW5jdGlvbiByb3V0ZV9tZXNzYWdlKGdfbXNnOiBGbG93TWVzc2FnZSwgZmtfcmVzcG9uZDogQ29tcGxldGlvblJlc3BvbnNlKSB7XG5cdC8vIGF1dGhlbnRpY2F0ZVxuXHRpZignYXV0aGVudGljYXRlJyA9PT0gZ19tc2cudHlwZSkge1xuXHRcdC8vIHZlcmJvc2Vcblx0XHRkb21sb2coYENhbGxpbmcgYnVpbHQtaW4gaGFuZGxlciBmb3IgJyR7Z19tc2cudHlwZX0nYCk7XG5cblx0XHQvLyBhdXRoZW50aWNhdGVcblx0XHRyZXR1cm4gdm9pZCBhdXRoZW50aWNhdGUoKGJfYW5zd2VyKSA9PiB7XG5cdFx0XHRma19yZXNwb25kKGJfYW5zd2VyLCBnX21zZy5wYWdlKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIGxvb2t1cCBoYW5kbGVyXG5cdGNvbnN0IGZfaGFuZGxlciA9IEhfSEFORExFUlNfQVVUSEVEW2dfbXNnLnR5cGVdIGFzIFZvY2FiLkhhbmRsZXI8Rmxvd01lc3NhZ2UsIFtDb21wbGV0ZWRdPiB8IHVuZGVmaW5lZDtcblxuXHQvLyBubyBzdWNoIGhhbmRsZXJcblx0aWYoIWZfaGFuZGxlcikge1xuXHRcdHJldHVybiBkb21sb2coYE5vIHN1Y2ggaGFuZGxlciByZWdpc3RlcmVkIGZvciAnJHtnX21zZy50eXBlfSdgKTtcblx0fVxuXG5cdC8vIGNoZWNrIGlmIHJvb3Qga2V5IGlzIGFjY2Vzc2libGVcblx0Y29uc3QgZGtfcm9vdCA9IGF3YWl0IFZhdWx0LmdldFJvb3RLZXkoKTtcblxuXHQvLyBub3Qgc2lnbmVkIGluXG5cdGlmKCFka19yb290KSB7XG5cdFx0Ly8gdmVyYm9zZVxuXHRcdGRvbWxvZyhgVmF1bHQgaXMgbG9ja2VkLiBSZWRpcmVjdGluZyB0byBsb2dpbi5gKTtcblxuXHRcdC8vIGF1dGhlbnRpY2F0ZTsgcmV0cnlcblx0XHRyZXR1cm4gdm9pZCBhdXRoZW50aWNhdGUoKCkgPT4ge1xuXHRcdFx0dm9pZCByb3V0ZV9tZXNzYWdlKGdfbXNnLCBma19yZXNwb25kKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIHZlcmJvc2Vcblx0ZG9tbG9nKGBDYWxsaW5nIHJlZ2lzdGVyZWQgaGFuZGxlciBmb3IgJyR7Z19tc2cudHlwZX0nYCk7XG5cblx0Ly8gY2FsbCBoYW5kbGVyXG5cdHZvaWQgZl9oYW5kbGVyKGdfbXNnWyd2YWx1ZSddIGFzIEZsb3dNZXNzYWdlLCAoYl9hbnN3ZXIpID0+IHtcblx0XHRma19yZXNwb25kKGJfYW5zd2VyLCBnX21zZy5wYWdlKTtcblx0fSk7XG59XG5cblxuYXN5bmMgZnVuY3Rpb24gc3VnZ2VzdF9yZWxvYWRfcGFnZShnX3BhZ2U6IFBhZ2UpIHtcblx0Ly8gdHJ5IHRvIGdldCB0aGUgdGFiIHRoYXQgaW5pdGlhdGVkIHRoaXMgYWN0aW9uXG5cdGxldCBnX3RhYiE6IGNocm9tZS50YWJzLlRhYjtcblx0dHJ5IHtcblx0XHRnX3RhYiA9IGF3YWl0IGNocm9tZS50YWJzLmdldChnX3BhZ2UudGFiSWQpO1xuXHR9XG5cdC8vIGlnbm9yZSBlcnJvcnNcblx0Y2F0Y2goZV9nZXQpIHt9XG5cblx0Ly8gdGFiIG5vIGxvbmdlciBleGlzdHNcblx0aWYoIWdfdGFiIHx8ICFnX3RhYi51cmwpIHJldHVybjtcblxuXHQvLyB1cmwgaGFzIGNoYW5nZWRcblx0aWYoZ19wYWdlLmhyZWYgIT09IGdfdGFiLnVybCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIHN1Z2dlc3QgcmVsb2FkXG5cdHJldHVybiBuZXcgUHJvbWlzZSgoZmtfcmVzb2x2ZSkgPT4ge1xuXHRcdC8vIG5ldyBTdWdnZXN0UmVsb2FkU3ZlbHRlKHtcblx0XHQvLyBcdHRhcmdldDogZG9jdW1lbnQuYm9keSxcblx0XHQvLyBcdHByb3BzOiB7XG5cdFx0Ly8gXHRcdHBhZ2U6IGdfcGFnZSxcblx0XHQvLyBcdFx0Y29tcGxldGVkOiBma19yZXNvbHZlLFxuXHRcdC8vIFx0fSxcblx0XHQvLyB9KTtcblx0fSk7XG59XG5cbihmdW5jdGlvbigpIHtcblx0Ly8gdmVyYm9zZVxuXHRkb21sb2coJ0Zsb3cgc2NyaXB0IGluaXQnKTtcblxuXHQvLyBwYXJzZSBxdWVyeSBwYXJhbXNcblx0Y29uc3QgaF9xdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpKTtcblxuXHQvLyBlbnZpcm9ubWVudCBjYXB0dXJlXG5cdGNvbnN0IHNpX29iamVjdGl2ZSA9IGhfcXVlcnkuZ2V0KCdoZWFkbGVzcycpO1xuXHRpZihzaV9vYmplY3RpdmUpIHtcblx0XHRpZignaW5mbycgPT09IHNpX29iamVjdGl2ZSkge1xuXHRcdFx0cmV0dXJuIGNocm9tZS5zdG9yYWdlLnNlc3Npb24uc2V0KHtcblx0XHRcdFx0ZGlzcGxheV9pbmZvOiB7XG5cdFx0XHRcdFx0d2lkdGg6IHNjcmVlbi53aWR0aCxcblx0XHRcdFx0XHRoZWlnaHQ6IHNjcmVlbi5oZWlnaHQsXG5cdFx0XHRcdFx0YXZhaWxIZWlnaHQ6IHNjcmVlbi5hdmFpbEhlaWdodCxcblx0XHRcdFx0XHRhdmFpbFdpZHRoOiBzY3JlZW4uYXZhaWxXaWR0aCxcblx0XHRcdFx0XHRvcmllbnRhdGlvbjogc2NyZWVuLm9yaWVudGF0aW9uLFxuXHRcdFx0XHRcdGRldmljZVBpeGVsUmF0aW86IGRldmljZVBpeGVsUmF0aW8sXG5cdFx0XHRcdH0sXG5cdFx0XHR9KS50aGVuKCgpID0+IHtcblx0XHRcdFx0d2luZG93LmNsb3NlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHR3aW5kb3cuY2xvc2UoKTtcblx0fVxuXG5cdC8vIHVzZSBicm9hZGNhc3QgY2hhbm5lbFxuXHRpZignYnJvYWRjYXN0JyA9PT0gaF9xdWVyeS5nZXQoJ2NvbW0nKSkge1xuXHRcdC8vIHZlcmJvc2Vcblx0XHRkb21sb2coJ1VzaW5nIGJyb2FkY2FzdCBjb21tJyk7XG5cblx0XHQvLyByZWYgY2hhbm5lbCBuYW1lXG5cdFx0Y29uc3Qgc2lfY2hhbm5lbCA9IGhfcXVlcnkuZ2V0KCduYW1lJyk7XG5cblx0XHQvLyBubyBjaGFubmVsIG5hbWVcblx0XHRpZignc3RyaW5nJyAhPT0gdHlwZW9mIHNpX2NoYW5uZWwgfHwgIXNpX2NoYW5uZWwpIHtcblx0XHRcdHJldHVybiBkb21sb2coJ0ludmFsaWQgb3IgbWlzc2luZyBjaGFubmVsIG5hbWUnKTtcblx0XHR9XG5cblx0XHQvLyB2ZXJib3NlXG5cdFx0ZG9tbG9nKGBDaGFubmVsIG5hbWU6ICcke3NpX2NoYW5uZWx9J2ApO1xuXG5cdFx0Ly8gY3JlYXRlIGJyb2FkY2FzdCBjaGFubmVsXG5cdFx0Y29uc3QgZF9icm9hZGNhc3Q6IFZvY2FiLlR5cGVkQnJvYWRjYXN0PEludHJhRXh0LkZsb3dSZXNwb25zZVZvY2FiLCBJbnRyYUV4dC5GbG93Vm9jYWI+ID0gbmV3IEJyb2FkY2FzdENoYW5uZWwoc2lfY2hhbm5lbCk7XG5cdFx0Y29uc3QgcmVzcG9uZF9icm9hZGNhc3Q6IENvbXBsZXRpb25SZXNwb25zZSA9IChiX2Fuc3dlciwgZ19wYWdlKSA9PiB7XG5cdFx0XHQvLyBwb3N0IHRvIGJyb2FkY2FzdFxuXHRcdFx0ZF9icm9hZGNhc3QucG9zdE1lc3NhZ2Uoe1xuXHRcdFx0XHR0eXBlOiAnY29tcGxldGVGbG93Jyxcblx0XHRcdFx0dmFsdWU6IHtcblx0XHRcdFx0XHRhbnN3ZXI6IGJfYW5zd2VyLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIGlmIHBhZ2Ugc3RpbGwgZXhpc3RzIGFmdGVyIHNvbWUgdGltZSwgdGhlbiBzZXJ2aWNlIHdvcmtlciBpcyBkZWFkXG5cdFx0XHRzZXRUaW1lb3V0KGFzeW5jKCkgPT4ge1xuXHRcdFx0XHQvLyBzdWdnZXN0IHJlbG9hZGluZyB0aGUgcGFnZVxuXHRcdFx0XHRpZihnX3BhZ2UpIHtcblx0XHRcdFx0XHRhd2FpdCBzdWdnZXN0X3JlbG9hZF9wYWdlKGdfcGFnZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyB1bmxvYWRcblx0XHRcdFx0YXdhaXQgdW5sb2FkKCk7XG5cblx0XHRcdFx0Ly8gdGhlbiBleGl0XG5cdFx0XHRcdHdpbmRvdy5jbG9zZSgpO1xuXHRcdFx0fSwgMjAwKTtcblx0XHR9O1xuXG5cdFx0Ly8gbGlzdGVuIGZvciBtZXNzYWdlIG9uIGJyb2FkY2FzdCBjaGFubmVsXG5cdFx0ZF9icm9hZGNhc3Qub25tZXNzYWdlID0gZnVuY3Rpb24oZF9ldmVudCkge1xuXHRcdFx0Ly8gcmVmIG1lc3NhZ2UgZGF0YVxuXHRcdFx0Y29uc3QgZ19tc2cgPSBkX2V2ZW50LmRhdGEgYXMgdHlwZW9mIGRfZXZlbnQuZGF0YSB8IG51bGwgfCB7dHlwZTogdW5kZWZpbmVkfTtcblxuXHRcdFx0Ly8gdmVyYm9zZVxuXHRcdFx0ZG9tbG9nKGBSZWNlaXZlZCA9PiAke0pTT04uc3RyaW5naWZ5KGdfbXNnKX1gKTtcblxuXHRcdFx0Ly8gaW52YWxpZCBldmVudCBkYXRhXG5cdFx0XHRpZighZ19tc2cgfHwgIWdfbXNnLnR5cGUpIHtcblx0XHRcdFx0cmV0dXJuIGRvbWxvZygnSW52YWxpZCBtZXNzYWdlJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHNhdmUgbWVzc2FnZSB0byBzdG9yYWdlXG5cdFx0XHRzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHNpX2NoYW5uZWwsIEpTT04uc3RyaW5naWZ5KGdfbXNnKSk7XG5cblx0XHRcdC8vIGFja25vd2xlZGdlIHJlY2VpcHRcblx0XHRcdGRfYnJvYWRjYXN0LnBvc3RNZXNzYWdlKHtcblx0XHRcdFx0dHlwZTogJ2Fja25vd2xlZGdlUmVjZWlwdCcsXG5cdFx0XHRcdHZhbHVlOiBnX21zZyxcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyByb3V0ZSBtZXNzYWdlXG5cdFx0XHR2b2lkIHJvdXRlX21lc3NhZ2UoZ19tc2csIHJlc3BvbmRfYnJvYWRjYXN0KTtcblx0XHR9O1xuXG5cdFx0Ly8gdmVyYm9zZVxuXHRcdGRvbWxvZygnTGlzdGVuaW5nIGZvciBtZXNzYWdlLi4uJyk7XG5cblx0XHQvLyByZWFkIGZyb20gc2Vzc2lvbiBzdG9yYWdlXG5cdFx0Y29uc3Qgc19yZWxvYWRlZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc2lfY2hhbm5lbCk7XG5cdFx0aWYoc19yZWxvYWRlZCkge1xuXHRcdFx0Ly8gdmVyYm9zZVxuXHRcdFx0ZG9tbG9nKCdBdHRlbXB0aW5nIHRvIHJlc3RvcmUgbWVzc2FnZSBhZnRlciByZWxvYWQuLi4nKTtcblxuXHRcdFx0Ly8gcGFyc2UgbWVzc2FnZSBmcm9tIHN0b3JhZ2Vcblx0XHRcdGxldCBnX3BhcnNlZDogRmxvd01lc3NhZ2U7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRnX3BhcnNlZCA9IEpTT04ucGFyc2Uoc19yZWxvYWRlZCk7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaChlX3BhcnNlKSB7XG5cdFx0XHRcdHJldHVybiBkb21sb2coJ0ZhaWxlZCB0byBwYXJzZSBtZXNzYWdlIGZyb20gc2Vzc2lvbiBzdG9yYWdlJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJvdXRlXG5cdFx0XHR2b2lkIHJvdXRlX21lc3NhZ2UoZ19wYXJzZWQsIHJlc3BvbmRfYnJvYWRjYXN0KTtcblx0XHR9XG5cdH1cblx0Ly8gdW5rbm93biBjb21tXG5cdGVsc2Uge1xuXHRcdGRvbWxvZyhgVW5rbm93biBjb21tICcke2hfcXVlcnkuZ2V0KCdjb21tJykgfHwgJyhudWxsIHwgdW5kZWZpbmVkKSd9J2ApO1xuXHR9XG59KSgpO1xuIl0sIm5hbWVzIjpbIlJlcXVlc3RDb25uZWN0aW9uUGVybWlzc2lvbnMiLCJTeXN0ZW1TdmVsdGUiLCJBdXRoZW50aWNhdGVTdmVsdGUiLCJSZXF1ZXN0QWR2ZXJ0aXNlbWVudFN2ZWx0ZSIsIlJlcXVlc3RDb25uZWN0aW9uU3ZlbHRlIl0sIm1hcHBpbmdzIjoiOztBQVNBLE1BQU0sYUFBYSxPQUFPLG9CQUFvQjtBQThCOUMsTUFBTSxhQUFhO0FBQUEsRUFDbEIsQ0FBQyx1QkFBdUI7QUFBQSxJQUN2QixRQUFRO0FBQUEsSUFDUixNQUFNLFNBQWdDO0FBRXJDLFVBQUcsQ0FBQztBQUFnQixlQUFBO0FBR3BCLFlBQU0sYUFBdUIsQ0FBQTtBQUM3QixlQUFRLFdBQVcsUUFBUSxN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
