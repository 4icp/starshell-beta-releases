import { S as Screen, f as domlog, d as dm_log, e as System, P as PreRegister, g as Authenticate } from "../../PreRegister.4cfa52aa.js";
import { S as SvelteComponent, i as init, s as safe_not_equal, c as create_component, m as mount_component, t as transition_in, a as transition_out, d as destroy_component, bh as Apps, aq as handle_promise, v as text, g as space, h as element, j as insert, Q as append, R as listen, as as update_await_block_branch, l as detach, $ as run_all, W as WebResourceCache, bG as P_PUBLIC_SUFFIX_LIST, bH as R_DOMAIN_LOCALHOST, bI as R_DOMAIN_IP, x as noop, aj as empty, at as destroy_each, w as attr, a7 as src_url_equal, a3 as getContext, A as ActionsLine, bJ as session_storage_remove, V as Vault, I as ode } from "../../web-resource-cache.58aa6c5e.js";
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
    } else if ("https" === g_app.scheme) {
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
var Banner_svelte_svelte_type_style_lang = "";
function create_if_block_1(ctx) {
  let div;
  let img;
  let img_src_value;
  return {
    c() {
      div = element("div");
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = ctx[0].image))
        attr(img, "src", img_src_value);
      attr(img, "alt", ctx[0].text || "");
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
  if ("authenticate" === g_msg.type) {
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
    if ("info" === si_objective) {
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
  if ("broadcast" === h_query.get("comm")) {
    domlog("Using broadcast comm");
    const si_channel = h_query.get("name");
    if ("string" !== typeof si_channel || !si_channel) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvdy43NGMwMGYwZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9zY3JlZW4vUmVxdWVzdEFkdmVydGlzZW1lbnQuc3ZlbHRlIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC91aS9CYW5uZXIuc3ZlbHRlIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9zY3JlZW4vUmVxdWVzdENvbm5lY3Rpb25fUGVybWlzc2lvbnMuc3ZlbHRlIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9zY3JlZW4vUmVxdWVzdENvbm5lY3Rpb24uc3ZlbHRlIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2VudHJ5L2Zsb3cudHMiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHsgU2NyZWVuLCB0eXBlIFBhZ2UgfSBmcm9tICcuL19zY3JlZW5zJztcblx0aW1wb3J0IHsgVmF1bHQgfSBmcm9tICcjL2NyeXB0by92YXVsdCc7XG5cblx0aW1wb3J0IHR5cGUgeyBBcHAgfSBmcm9tICcjL21ldGEvYXBwJztcblx0aW1wb3J0IHsgQXBwcyB9IGZyb20gJyMvc3RvcmUvYXBwcyc7XG5cblx0aW1wb3J0IHsgb25Nb3VudH0gZnJvbSAnc3ZlbHRlJztcblx0aW1wb3J0IHsgUF9QVUJMSUNfU1VGRklYX0xJU1QsIFJfRE9NQUlOX0lQLCBSX0RPTUFJTl9MT0NBTEhPU1QgfSBmcm9tICcjL3NoYXJlL2NvbnN0YW50cyc7XG5cdGltcG9ydCB0eXBlIHsgQ29tcGxldGVkIH0gZnJvbSAnIy9lbnRyeS9mbG93Jztcblx0aW1wb3J0IHsgV2ViUmVzb3VyY2VDYWNoZSB9IGZyb20gJyMvc3RvcmUvd2ViLXJlc291cmNlLWNhY2hlJztcblxuXHRpbXBvcnQgJyMvY2hhaW4vbWFpbic7XG5cblx0XG5cdGV4cG9ydCBsZXQga19wYWdlOiBQYWdlO1xuXG5cdGV4cG9ydCBsZXQgY29tcGxldGVkOiBDb21wbGV0ZWQ7XG5cblx0ZXhwb3J0IGxldCBhcHA6IEFwcFsnaW50ZXJmYWNlJ107XG5cdGNvbnN0IGdfYXBwID0gYXBwO1xuXG5cdC8vIGRlcml2ZSBwYXRoIGZyb20gYXBwIHN0cnVjdFxuXHRjb25zdCBwX2FwcCA9IEFwcHMucGF0aEZyb20oZ19hcHApO1xuXG5cdC8vIHJlZiBob3N0XG5cdGNvbnN0IHNfaG9zdCA9IGdfYXBwLmhvc3Q7XG5cblxuXHQvKlxuXG5cdEFwcHNTdG9yZS5zdWJzY3JpYmUoKGtzX2FwcHMpID0+IHtcblx0XHRjb25zdCBwX2FwcCA9IGtzX2FwcHMucGF0aEZvcihnX2FwcCk7XG5cblx0Ki9cblxuXHRsZXQgYl9idXN5ID0gZmFsc2U7XG5cblx0YXN5bmMgZnVuY3Rpb24gYWxsb3coKTogUHJvbWlzZTwxPiB7XG5cdFx0Ly8gZG8gbm90IGludGVydXB0OyBsb2NrXG5cdFx0aWYoYl9idXN5KSByZXR1cm4gMTsgYl9idXN5ID0gdHJ1ZTtcblxuXHRcdC8vIHByZXAgZ3JhY2VmdWwgZXhpdFxuXHRcdGNvbnN0IGV4aXQgPSAoKTogMSA9PiAoYl9idXN5ID0gZmFsc2UsIDEpO1xuXG5cdFx0Ly8gc2F2ZSBhcHAgZGVmIHRvIHN0b3JhZ2Vcblx0XHRhd2FpdCBBcHBzLm9wZW4oYXN5bmMoa3NfYXBwcykgPT4ge1xuXHRcdFx0YXdhaXQga3NfYXBwcy5wdXQoa3NfYXBwcy5hdChwX2FwcCkgfHwgZ19hcHApO1xuXHRcdH0pO1xuXG5cdFx0Ly8gZG9uZVxuXHRcdGNvbXBsZXRlZCh0cnVlKTtcblx0XHRyZXR1cm4gZXhpdCgpO1xuXHR9XG5cblx0YXN5bmMgZnVuY3Rpb24gcGFyc2VfZG9tYWluX3BhcnRzKCk6IFByb21pc2U8c3RyaW5nW10+IHtcblx0XHQvLyBmZXRjaCB0aGUgY2FjaGVkIHN1ZmZpeCBsaXN0XG5cdFx0Y29uc3QgYV9zdWZmaXhlcyA9IGF3YWl0IFdlYlJlc291cmNlQ2FjaGUuZ2V0KFBfUFVCTElDX1NVRkZJWF9MSVNUKTtcblxuXHRcdC8vIHByZXAgZXRsZFxuXHRcdGxldCBzX2V0bGQgPSAnJztcblxuXHRcdC8vIGxpc3Qgb2YgZG9tYWlucyB0byBjb25zaWRlciBmb3IgbmV3IHVzZXIgcG9saWN5XG5cdFx0Y29uc3QgYV9kb21haW5zOiBzdHJpbmdbXSA9IFtdO1xuXG5cdFx0Ly8gbG9jYWxob3N0XG5cdFx0aWYoUl9ET01BSU5fTE9DQUxIT1NULnRlc3Qoc19ob3N0KSkge1xuXHRcdFx0Ly8gZnVsbCBkb21haW5cblx0XHRcdGFfZG9tYWlucy5wdXNoKHNfaG9zdCk7XG5cdFx0fVxuXHRcdC8vIHNlY3VyZSBjb250ZXh0XG5cdFx0ZWxzZSBpZignaHR0cHMnID09PSBnX2FwcC5zY2hlbWUpIHtcblx0XHRcdC8vIGZ1bGwgZG9tYWluXG5cdFx0XHRhX2RvbWFpbnMucHVzaChzX2hvc3QpO1xuXG5cdFx0XHQvLyBub3QgYW4gaXAgYWRkcmVzc1xuXHRcdFx0aWYoIVJfRE9NQUlOX0lQLnRlc3Qoc19ob3N0KSkge1xuXHRcdFx0XHQvLyBleHRyYWN0IHBvcnQgc3VmZml4IGlmIGFueVxuXHRcdFx0XHRjb25zdCBzX3BvcnRfc3VmZml4ID0gc19ob3N0LnJlcGxhY2UoL14uKig6LispJC8sICckMScpO1xuXG5cdFx0XHRcdC8vIHNwbGl0IGhvc3RuYW1lXG5cdFx0XHRcdGNvbnN0IGFfc3VicyA9IHNfaG9zdC5yZXBsYWNlKC86LiskLywgJycpLnNwbGl0KCcuJyk7XG5cblx0XHRcdFx0Ly8gZWFjaCBwYXJ0IG9mIHRoZSBkb21haW5cblx0XHRcdFx0Zm9yKGxldCBpX2V0bGQ9YV9zdWJzLmxlbmd0aC0xOyBpX2V0bGQ+MDsgaV9ldGxkLS0pIHtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXRsZCB0ZXN0XG5cdFx0XHRcdFx0Y29uc3Qgc190ZXN0ID0gYV9zdWJzLnNsaWNlKGlfZXRsZCkuam9pbignLicpO1xuXG5cdFx0XHRcdFx0Ly8gaXMgYSByZWdzaXRlcmVkIHB1YmxpYyBzdWZmaXhcblx0XHRcdFx0XHRpZihhX3N1YnMuaW5jbHVkZXMoc190ZXN0KSkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHJlYWNoZWQgdGhlIGVuZCBvZiB0aGUgZXRsZFxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0c19ldGxkID0gc190ZXN0O1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gb3JnLWxldmVsIGRvbWFpblxuXHRcdFx0XHRhX2RvbWFpbnMucHVzaCgnKi4nK3NfZXRsZCtzX3BvcnRfc3VmZml4KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBhbnN3ZXJcblx0XHRyZXR1cm4gYV9kb21haW5zO1xuXHR9XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJsZXNzXCI+XG5cdFxuPC9zdHlsZT5cblxuPFNjcmVlbj5cblx0QWxsb3cge2dfYXBwLmhvc3R9IHRvIHNlZSB5b3UgaGF2ZSBTdGFyU2hlbGwgaW5zdGFsbGVkP1xuXG5cdHsjYXdhaXQgcGFyc2VfZG9tYWluX3BhcnRzKCkgdGhlbiBhX2RvbWFpbnN9XG5cdFx0eyNlYWNoIGFfZG9tYWlucyBhcyBzX3BhdHRlcm59XG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+IEFsd2F5cyBhbGxvdyA8Y29kZT57c19wYXR0ZXJufTwvY29kZT4gdG8gc2VlIFN0YXJTaGVsbC5cblx0XHRcdDwvZGl2PlxuXHRcdHsvZWFjaH1cblx0ey9hd2FpdH1cblxuXHQ8YnV0dG9uIGRpc2FibGVkPXtiX2J1c3l9IG9uOmNsaWNrPXsoKSA9PiBhbGxvdygpfT5BbGxvdzwvYnV0dG9uPlxuXHQ8YnV0dG9uIGRpc2FibGVkPXtiX2J1c3l9IG9uOmNsaWNrPXsoKSA9PiBjb21wbGV0ZWQoZmFsc2UpfT5DYW5jZWw8L2J1dHRvbj5cbjwvU2NyZWVuPlxuIiwiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCIgbGFuZz1cInRzXCI+XG5cdGV4cG9ydCB0eXBlIERpc3BsYXlDb25maWcgPSB7XG5cdFx0aW1hZ2U6IHN0cmluZztcblx0XHR0ZXh0Pzogc3RyaW5nO1xuXHR9O1xuPC9zY3JpcHQ+XG5cbjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cblx0ZXhwb3J0IGxldCBkaXNwbGF5OiBEaXNwbGF5Q29uZmlnO1xuXHRjb25zdCBnX2Rpc3BsYXkgPSBkaXNwbGF5O1xuXG5cdGV4cG9ydCBsZXQgZXhpdHMgPSBmYWxzZTtcblx0Y29uc3QgYl9leGl0cyA9IGV4aXRzO1xuXG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJsZXNzXCI+XG5cdEBpbXBvcnQgJy4vX2Jhc2UubGVzcyc7XG5cblx0LmJhY2tkcm9wIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcblx0XHR3aWR0aDogMTAwJTtcblx0XHRoZWlnaHQ6IDE3MnB4O1xuXG5cdFx0ZGlzcGxheTogZmxleDtcblxuXHRcdCY+LmltZyB7XG5cblx0XHR9XG5cblx0XHQmPi50ZXh0IHtcblx0XHRcdC5mb250KHJlZ3VsYXIpO1xuXHRcdFx0Y29sb3I6IHZhcigtLXRoZW1lLWNvbG9yLXRleHQtbGlnaHQpO1xuXHRcdH1cblx0fVxuPC9zdHlsZT5cblxuPGRpdiBjbGFzcz1cImJhY2tkcm9wXCI+XG5cdHsjaWYgZ19kaXNwbGF5LmltYWdlfVxuXHRcdDxkaXYgY2xhc3M9XCJpbWdcIj5cblx0XHRcdDxpbWcgc3JjPXtnX2Rpc3BsYXkuaW1hZ2V9IGFsdD17Z19kaXNwbGF5LnRleHQgfHwgJyd9IC8+XG5cdFx0PC9kaXY+XG5cdHsvaWZ9XG5cblx0eyNpZiBnX2Rpc3BsYXkudGV4dH1cblx0XHQ8ZGl2IGNsYXNzPVwidGV4dFwiPlxuXHRcdFx0e2dfZGlzcGxheS50ZXh0fVxuXHRcdDwvZGl2PlxuXHR7L2lmfVxuPC9kaXY+XG4iLCI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgeyBTY3JlZW4sIEhlYWRlciwgdHlwZSBQYWdlIH0gZnJvbSAnLi9fc2NyZWVucyc7XG5cblx0aW1wb3J0IHR5cGUgeyBDb21wbGV0ZWQgfSBmcm9tICcjL2VudHJ5L2Zsb3cnO1xuXHRpbXBvcnQgdHlwZSB7IEFwcCB9IGZyb20gJyMvbWV0YS9hcHAnO1xuXHRpbXBvcnQgdHlwZSB7IENoYWluRGVzY3JpcHRvciB9IGZyb20gJyMvc2NyaXB0L2NvbW1vbic7XG5cdGltcG9ydCBCYW5uZXIgZnJvbSAnLi4vdWkvQmFubmVyLnN2ZWx0ZSc7XG5cdGltcG9ydCBBY3Rpb25zTGluZSBmcm9tICcuLi91aS9BY3Rpb25zTGluZS5zdmVsdGUnO1xuaW1wb3J0IHsgZ2V0Q29udGV4dCB9IGZyb20gJ3N2ZWx0ZSc7XG5cblxuXHRjb25zdCBjb21wbGV0ZWQgPSBnZXRDb250ZXh0PENvbXBsZXRlZD4oJ2NvbXBsZXRlZCcpO1xuXG5cdGNvbnN0IHBfZmF2aWNvbiA9IGdldENvbnRleHQ8c3RyaW5nPignZmF2aWNvblNyYycpO1xuXHRjb25zdCBnX2FwcCA9IGdldENvbnRleHQ8QXBwWydpbnRlcmZhY2UnXT4oJ2FwcCcpO1xuXG5cdGNvbnN0IGFfY2hhaW5zID0gZ2V0Q29udGV4dDxDaGFpbkRlc2NyaXB0b3JbXT4oJ2NoYWlucycpO1xuXG5cdGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG5cdFx0Y29tcGxldGVkKHRydWUpO1xuXHR9XG48L3NjcmlwdD5cblxuPFNjcmVlbj5cblx0PEJhbm5lciBleGl0cyBkaXNwbGF5PXt7XG5cdFx0aW1hZ2U6IHBfZmF2aWNvbixcblx0XHR0ZXh0OiBnX2FwcC5ob3N0LFxuXHR9fSAvPlxuXG5cdDxjZW50ZXI+XG5cdFx0PGgzPlxuXHRcdFx0UmV2aWV3IHBlcm1pc3Npb25zXG5cdFx0PC9oMz5cblxuXHRcdDxoND5cblx0XHRcdEFsbG93IHRoaXMgc2l0ZSB0bzpcblx0XHQ8L2g0PlxuXHQ8L2NlbnRlcj5cblxuXHRcblxuXHQ8QWN0aW9uc0xpbmUgYmFjayBjb25maXJtPXtbJ0Nvbm5lY3QnLCBjb25uZWN0XX0gLz5cbjwvU2NyZWVuPlxuIiwiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHsgU2NyZWVuLCBIZWFkZXIsIHR5cGUgUGFnZSB9IGZyb20gJy4vX3NjcmVlbnMnO1xuXG5cdGltcG9ydCB0eXBlIHsgQ29tcGxldGVkIH0gZnJvbSAnIy9lbnRyeS9mbG93Jztcblx0aW1wb3J0IHR5cGUgeyBBcHAgfSBmcm9tICcjL21ldGEvYXBwJztcblx0aW1wb3J0IHR5cGUgeyBDaGFpbkRlc2NyaXB0b3IgfSBmcm9tICcjL3NjcmlwdC9jb21tb24nO1xuXHRpbXBvcnQgQmFubmVyIGZyb20gJy4uL3VpL0Jhbm5lci5zdmVsdGUnO1xuXHRpbXBvcnQgQWN0aW9uc0xpbmUgZnJvbSAnLi4vdWkvQWN0aW9uc0xpbmUuc3ZlbHRlJztcblx0aW1wb3J0IFJlcXVlc3RDb25uZWN0aW9uUGVybWlzc2lvbnMgZnJvbSAnLi9SZXF1ZXN0Q29ubmVjdGlvbl9QZXJtaXNzaW9ucy5zdmVsdGUnO1xuXHRpbXBvcnQgeyBnZXRDb250ZXh0IH0gZnJvbSAnc3ZlbHRlJztcblxuXHRjb25zdCBjb21wbGV0ZWQgPSBnZXRDb250ZXh0PENvbXBsZXRlZD4oJ2NvbXBsZXRlZCcpO1xuXG5cdGNvbnN0IGdfYXBwID0gZ2V0Q29udGV4dDxBcHBbJ2ludGVyZmFjZSddPignYXBwJyk7XG5cdGNvbnN0IHBfZmF2aWNvbiA9IGdldENvbnRleHQ8c3RyaW5nPignZmF2aWNvblNyYycpO1xuXG5cdC8vIGBkYXRhOmltYWdlL3BuZztiYXNlNjQsJHtzeF9wbmd9YFxuXG5cdGNvbnN0IGFfY2hhaW5zID0gZ2V0Q29udGV4dDxDaGFpbkRlc2NyaXB0b3JbXT4oJ2NoYWlucycpO1xuXHRjb25zdCBpX2NoYWluID0gZ2V0Q29udGV4dDxudW1iZXI+KCdjaGFpbkluZGV4JykgfHwgMDtcblx0Y29uc3QgZ19jaGFpbiA9IGFfY2hhaW5zW2lfY2hhaW5dO1xuXG5cdC8vIHNlbGVjdGVkIGFjY291bnRzIHRvIGFwcGx5IHRoZSBjb25uZWN0aW9uIHRvXG5cdGxldCBhX2FjY291bnRzID0gW107XG48L3NjcmlwdD5cblxuPFNjcmVlbj5cblx0PEJhbm5lciBkaXNwbGF5PXt7XG5cdFx0aW1hZ2U6IHBfZmF2aWNvbixcblx0XHR0ZXh0OiBnX2FwcC5ob3N0LFxuXHR9fSAvPlxuXG5cdDxjZW50ZXI+XG5cdFx0PGgzPlxuXHRcdFx0Q29ubmVjdCB0byBTdGFyU2hlbGxcblx0XHQ8L2gzPlxuXG5cdFx0PGg0PlxuXHRcdFx0U2VsZWN0IGFjY291bnQocylcblx0XHQ8L2g0PlxuXHQ8L2NlbnRlcj5cblxuXHQ8IS0tIDxSb3dzIC0tPlxuXG5cdDxBY3Rpb25zTGluZSBjYW5jZWw9eygpID0+IGNvbXBsZXRlZChmYWxzZSl9IGNvbnRkPXt7XG5cdFx0Y3JlYXRvcjogUmVxdWVzdENvbm5lY3Rpb25QZXJtaXNzaW9ucyxcblx0XHRwcm9wczoge1xuXHRcdFx0YWNjb3VudHM6IGFfYWNjb3VudHMsXG5cdFx0fSxcblx0fX0gLz5cbjwvU2NyZWVuPlxuIiwiaW1wb3J0IFN5c3RlbVN2ZWx0ZSBmcm9tICcjIy9jb250YWluZXIvU3lzdGVtLnN2ZWx0ZSc7XG5pbXBvcnQgQmxhbmtTdmVsdGUgZnJvbSAnIyMvc2NyZWVuL0JsYW5rLnN2ZWx0ZSc7XG5pbXBvcnQgQXV0aGVudGljYXRlU3ZlbHRlIGZyb20gJyMjL3NjcmVlbi9BdXRoZW50aWNhdGUuc3ZlbHRlJztcbmltcG9ydCBSZWdpc3RlclN2ZWx0ZSBmcm9tICcjIy9zY3JlZW4vUmVnaXN0ZXIuc3ZlbHRlJztcblxuaW1wb3J0IFJlcXVlc3RBZHZlcnRpc2VtZW50U3ZlbHRlIGZyb20gJyMjL3NjcmVlbi9SZXF1ZXN0QWR2ZXJ0aXNlbWVudC5zdmVsdGUnO1xuaW1wb3J0IFJlcXVlc3RDb25uZWN0aW9uU3ZlbHRlIGZyb20gJyMjL3NjcmVlbi9SZXF1ZXN0Q29ubmVjdGlvbi5zdmVsdGUnO1xuXG5pbXBvcnQgeyBzZXNzaW9uX3N0b3JhZ2VfcmVtb3ZlLCBWYXVsdCB9IGZyb20gJyMvY3J5cHRvL3ZhdWx0JztcbmltcG9ydCB0eXBlIHsgVm9jYWIgfSBmcm9tICcjL21ldGEvdm9jYWInO1xuaW1wb3J0IHR5cGUgeyBJbnRyYUV4dCB9IGZyb20gJyMvc2NyaXB0L21lc3NhZ2VzJztcbmltcG9ydCB7IGRkLCBxcyB9IGZyb20gJyMvdXRpbC9kb20nO1xuaW1wb3J0IHR5cGUgeyBVbmlvbiB9IGZyb20gJ3RzLXRvb2xiZWx0JztcbmltcG9ydCB0eXBlIHsgUGFyYW1ldHJpY1N2ZWx0ZUNvbnN0cnVjdG9yIH0gZnJvbSAnIy9tZXRhL3N2ZWx0ZSc7XG5pbXBvcnQgeyBkbV9sb2csIGRvbWxvZyB9IGZyb20gJy4vZmFsbGJhY2snO1xuaW1wb3J0IHR5cGUgeyBQbGFpbk9iamVjdCB9IGZyb20gJyMvbWV0YS9iZWx0JztcbmltcG9ydCB0eXBlIHsgU3ZlbHRlQ29tcG9uZW50IH0gZnJvbSAnc3ZlbHRlJztcbmltcG9ydCB7IG9kZSB9IGZyb20gJyMvdXRpbC9iZWx0JztcbmltcG9ydCBQcmVSZWdpc3RlciBmcm9tICcjL2FwcC9zY3JlZW4vUHJlUmVnaXN0ZXIuc3ZlbHRlJztcblxuZXhwb3J0IHR5cGUgRmxvd01lc3NhZ2UgPSBWb2NhYi5NZXNzYWdlPEludHJhRXh0LkZsb3dWb2NhYj47XG5cbmV4cG9ydCB0eXBlIFBhZ2UgPSBVbmlvbi5NZXJnZTxOb25OdWxsYWJsZTxWb2NhYi5NZXNzYWdlUGFydDxJbnRyYUV4dC5GbG93Vm9jYWIsICdwYWdlJz4+PjtcblxuXG5leHBvcnQgdHlwZSBDb21wbGV0ZWQgPSAoYl9hbnN3ZXI6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbmV4cG9ydCB0eXBlIENvbXBsZXRpb25SZXNwb25zZSA9IChiX2Fuc3dlcjogYm9vbGVhbiwgZ19wYWdlOiBudWxsIHwgUGFnZSkgPT4gdm9pZDtcblxuXG4vLyBiZWZvcmUgdGhpcyB3aW5kb3cgaXMgdW5sb2FkZWRcbmFzeW5jIGZ1bmN0aW9uIHVubG9hZCgpIHtcblx0Ly8gY2xlYXIgdGhlIGZsb3cgdmFsdWUgZnJvbSBzZXNzaW9uIHN0b3JhZ2Vcblx0YXdhaXQgc2Vzc2lvbl9zdG9yYWdlX3JlbW92ZSgnZmxvdycpO1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW1pc3VzZWQtcHJvbWlzZXNcbmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIHVubG9hZCk7XG5cbi8vIHRvcC1sZXZlbCBzeXN0ZW0gY29tcG9uZW50XG5sZXQgeWNfc3lzdGVtOiBTdmVsdGVDb21wb25lbnQgfCBudWxsID0gbnVsbDtcblxuZnVuY3Rpb24gb3Blbl9mbG93PFxuXHRkY19zY3JlZW4gZXh0ZW5kcyBQYXJhbWV0cmljU3ZlbHRlQ29uc3RydWN0b3IsXG4+KGRjX3NjcmVlbjogZGNfc2NyZWVuLCBoX2NvbnRleHQ6IFBsYWluT2JqZWN0LCBnX3Byb3BzPzogT21pdDxQYXJhbWV0cmljU3ZlbHRlQ29uc3RydWN0b3IuUGFydHM8ZGNfc2NyZWVuPlsncGFyYW1zJ10sICdrX3BhZ2UnPikge1xuXHQvLyBhdHRlbXB0IHRvIGhpZGUgbG9nXG5cdHRyeSB7XG5cdFx0ZG1fbG9nIS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHR9XG5cdGNhdGNoKGVfaGlkZSkge31cblxuXHQvLyBkZXN0cm95IHByZXZpb3VzIHN5c3RlbVxuXHRpZih5Y19zeXN0ZW0pIHtcblx0XHR0cnkge1xuXHRcdFx0eWNfc3lzdGVtLiRkZXN0cm95KCk7XG5cdFx0fVxuXHRcdGNhdGNoKGVfZGVzdHJveSkge31cblxuXHRcdHRyeSB7XG5cdFx0XHRxcyhkb2N1bWVudC5ib2R5LCAnbWFpbicpPy5yZW1vdmUoKTtcblx0XHR9XG5cdFx0Y2F0Y2goZV9yZW1vdmUpIHt9XG5cdH1cblxuXHQvLyBjcmVhdGUgc3lzdGVtXG5cdG5ldyBTeXN0ZW1TdmVsdGUoe1xuXHRcdHRhcmdldDogZG9jdW1lbnQuYm9keSxcblx0XHRwcm9wczoge1xuXHRcdFx0bW9kZTogJ2Zsb3cnLFxuXHRcdFx0cGFnZToge1xuXHRcdFx0XHRjcmVhdG9yOiBkY19zY3JlZW4sXG5cdFx0XHRcdHByb3BzOiBnX3Byb3BzIHx8IHt9LFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGNvbnRleHQ6IG5ldyBNYXAob2RlKGhfY29udGV4dCkpLFxuXHR9KTtcbn1cblxuXG4vLyBhdXRoZW50aWNhdGUgdGhlIHVzZXJcbmFzeW5jIGZ1bmN0aW9uIGF1dGhlbnRpY2F0ZShma19jb21wbGV0ZWQ6IENvbXBsZXRlZCkge1xuXHQvLyB2ZXJib3NlXG5cdGRvbWxvZyhgSGFuZGxpbmcgJ2F1dGhlbnRpY2F0ZScuYCk7XG5cblx0Ly8gY2hlY2sgaWYgcm9vdCBrZXkgaXMgYWNjZXNzaWJsZVxuXHRjb25zdCBka19yb290ID0gYXdhaXQgVmF1bHQuZ2V0Um9vdEtleSgpO1xuXG5cdC8vIGFscmVhZHkgc2lnbmVkIGluXG5cdGlmKGRrX3Jvb3QpIHtcblx0XHQvLyB2ZXJib3NlXG5cdFx0ZG9tbG9nKGBWYXVsdCBpcyBhbHJlYWR5IHVubG9ja2VkLmApO1xuXG5cdFx0Ly8gVE9ETzogY29uc2lkZXIgXCJhbHJlYWR5IGF1dGhlbnRpY2F0ZWRcIiBkb21cblx0XHQvLyBvcGVuX2Zsb3coQmxhbmtTdmVsdGUsIHt9KTtcblxuXHRcdC8vIGNhbGxiYWNrXG5cdFx0ZmtfY29tcGxldGVkKHRydWUpO1xuXG5cdFx0Ly8gZXhpdFxuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIHJldHJpZXZlIHJvb3Rcblx0Y29uc3QgZ19yb290ID0gYXdhaXQgVmF1bHQuZ2V0QmFzZSgpO1xuXG5cdC8vIG5vIHJvb3Qgc2V0LCBuZWVkIHRvIHJlZ2lzdGVyXG5cdGlmKCFnX3Jvb3QpIHtcblx0XHQvLyB2ZXJib3NlXG5cdFx0ZG9tbG9nKGBObyByb290IGZvdW5kLiBQcm9tcHRpbmcgcmVnaXN0cmF0aW9uLmApO1xuXG5cdFx0b3Blbl9mbG93KFByZVJlZ2lzdGVyLCB7XG5cdFx0XHRjb21wbGV0ZWQoKSB7XG5cdFx0XHRcdHZvaWQgYXV0aGVudGljYXRlKGZrX2NvbXBsZXRlZCk7XG5cdFx0XHR9LFxuXHRcdH0pO1xuXHR9XG5cdC8vIHJvb3QgaXMgc2V0LCBsb2dpblxuXHRlbHNlIHtcblx0XHQvLyB2ZXJib3NlXG5cdFx0ZG9tbG9nKGBSb290IGZvdW5kLiBQcm9tcHRpbmcgbG9naW4uYCk7XG5cblx0XHRvcGVuX2Zsb3coQXV0aGVudGljYXRlU3ZlbHRlLCB7XG5cdFx0XHRjb21wbGV0ZWQ6IGZrX2NvbXBsZXRlZCxcblx0XHR9KTtcblx0fVxufVxuXG5cbi8vIHByZXAgaGFuZGxlcnNcbmNvbnN0IEhfSEFORExFUlNfQVVUSEVEOiBWb2NhYi5IYW5kbGVyczxPbWl0PEludHJhRXh0LkZsb3dWb2NhYiwgJ2F1dGhlbnRpY2F0ZSc+LCBbQ29tcGxldGVkXT4gPSB7XG5cdHJlcXVlc3RBZHZlcnRpc2VtZW50KGdfdmFsdWUsIGZrX2NvbXBsZXRlZCkge1xuXHRcdC8vIHZlcmJvc2Vcblx0XHRkb21sb2coYEhhbmRsaW5nICdyZXF1ZXN0QWR2ZXJ0aXNlbWVudCcgb24gJHtKU09OLnN0cmluZ2lmeShnX3ZhbHVlKX1gKTtcblxuXHRcdG9wZW5fZmxvdyhSZXF1ZXN0QWR2ZXJ0aXNlbWVudFN2ZWx0ZSwge30sIHtcblx0XHRcdGNvbXBsZXRlZDogZmtfY29tcGxldGVkLFxuXHRcdFx0YXBwOiBnX3ZhbHVlLmFwcCxcblx0XHR9KTtcblx0fSxcblxuXHRyZXF1ZXN0Q29ubmVjdGlvbihnX3ZhbHVlLCBma19jb21wbGV0ZWQpIHtcblx0XHQvLyB2ZXJib3NlXG5cdFx0ZG9tbG9nKGBIYW5kbGluZyAncmVxdWVzdENvbm5lY3Rpb24nIG9uICR7SlNPTi5zdHJpbmdpZnkoZ192YWx1ZSl9YCk7XG5cblx0XHRvcGVuX2Zsb3coUmVxdWVzdENvbm5lY3Rpb25TdmVsdGUsIHtcblx0XHRcdGNvbXBsZXRlZDogZmtfY29tcGxldGVkLFxuXHRcdFx0YXBwOiBnX3ZhbHVlLmFwcCxcblx0XHRcdGNoYWluczogZ192YWx1ZS5jaGFpbnMsXG5cdFx0fSk7XG5cdH0sXG5cblx0c2lnblRyYW5zYWN0aW9uKHdfdmFsdWUpIHtcblxuXHR9LFxufSBhcyBjb25zdDtcblxuXG4vLyBtZXNzYWdlIHJvdXRlclxuYXN5bmMgZnVuY3Rpb24gcm91dGVfbWVzc2FnZShnX21zZzogRmxvd01lc3NhZ2UsIGZrX3Jlc3BvbmQ6IENvbXBsZXRpb25SZXNwb25zZSkge1xuXHQvLyBhdXRoZW50aWNhdGVcblx0aWYoJ2F1dGhlbnRpY2F0ZScgPT09IGdfbXNnLnR5cGUpIHtcblx0XHQvLyB2ZXJib3NlXG5cdFx0ZG9tbG9nKGBDYWxsaW5nIGJ1aWx0LWluIGhhbmRsZXIgZm9yICcke2dfbXNnLnR5cGV9J2ApO1xuXG5cdFx0Ly8gYXV0aGVudGljYXRlXG5cdFx0cmV0dXJuIHZvaWQgYXV0aGVudGljYXRlKChiX2Fuc3dlcikgPT4ge1xuXHRcdFx0ZmtfcmVzcG9uZChiX2Fuc3dlciwgZ19tc2cucGFnZSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBsb29rdXAgaGFuZGxlclxuXHRjb25zdCBmX2hhbmRsZXIgPSBIX0hBTkRMRVJTX0FVVEhFRFtnX21zZy50eXBlXSBhcyBWb2NhYi5IYW5kbGVyPEZsb3dNZXNzYWdlLCBbQ29tcGxldGVkXT4gfCB1bmRlZmluZWQ7XG5cblx0Ly8gbm8gc3VjaCBoYW5kbGVyXG5cdGlmKCFmX2hhbmRsZXIpIHtcblx0XHRyZXR1cm4gZG9tbG9nKGBObyBzdWNoIGhhbmRsZXIgcmVnaXN0ZXJlZCBmb3IgJyR7Z19tc2cudHlwZX0nYCk7XG5cdH1cblxuXHQvLyBjaGVjayBpZiByb290IGtleSBpcyBhY2Nlc3NpYmxlXG5cdGNvbnN0IGRrX3Jvb3QgPSBhd2FpdCBWYXVsdC5nZXRSb290S2V5KCk7XG5cblx0Ly8gbm90IHNpZ25lZCBpblxuXHRpZighZGtfcm9vdCkge1xuXHRcdC8vIHZlcmJvc2Vcblx0XHRkb21sb2coYFZhdWx0IGlzIGxvY2tlZC4gUmVkaXJlY3RpbmcgdG8gbG9naW4uYCk7XG5cblx0XHQvLyBhdXRoZW50aWNhdGU7IHJldHJ5XG5cdFx0cmV0dXJuIHZvaWQgYXV0aGVudGljYXRlKCgpID0+IHtcblx0XHRcdHZvaWQgcm91dGVfbWVzc2FnZShnX21zZywgZmtfcmVzcG9uZCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvLyB2ZXJib3NlXG5cdGRvbWxvZyhgQ2FsbGluZyByZWdpc3RlcmVkIGhhbmRsZXIgZm9yICcke2dfbXNnLnR5cGV9J2ApO1xuXG5cdC8vIGNhbGwgaGFuZGxlclxuXHR2b2lkIGZfaGFuZGxlcihnX21zZ1sndmFsdWUnXSBhcyBGbG93TWVzc2FnZSwgKGJfYW5zd2VyKSA9PiB7XG5cdFx0ZmtfcmVzcG9uZChiX2Fuc3dlciwgZ19tc2cucGFnZSk7XG5cdH0pO1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIHN1Z2dlc3RfcmVsb2FkX3BhZ2UoZ19wYWdlOiBQYWdlKSB7XG5cdC8vIHRyeSB0byBnZXQgdGhlIHRhYiB0aGF0IGluaXRpYXRlZCB0aGlzIGFjdGlvblxuXHRsZXQgZ190YWIhOiBjaHJvbWUudGFicy5UYWI7XG5cdHRyeSB7XG5cdFx0Z190YWIgPSBhd2FpdCBjaHJvbWUudGFicy5nZXQoZ19wYWdlLnRhYklkKTtcblx0fVxuXHQvLyBpZ25vcmUgZXJyb3JzXG5cdGNhdGNoKGVfZ2V0KSB7fVxuXG5cdC8vIHRhYiBubyBsb25nZXIgZXhpc3RzXG5cdGlmKCFnX3RhYiB8fCAhZ190YWIudXJsKSByZXR1cm47XG5cblx0Ly8gdXJsIGhhcyBjaGFuZ2VkXG5cdGlmKGdfcGFnZS5ocmVmICE9PSBnX3RhYi51cmwpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBzdWdnZXN0IHJlbG9hZFxuXHRyZXR1cm4gbmV3IFByb21pc2UoKGZrX3Jlc29sdmUpID0+IHtcblx0XHQvLyBuZXcgU3VnZ2VzdFJlbG9hZFN2ZWx0ZSh7XG5cdFx0Ly8gXHR0YXJnZXQ6IGRvY3VtZW50LmJvZHksXG5cdFx0Ly8gXHRwcm9wczoge1xuXHRcdC8vIFx0XHRwYWdlOiBnX3BhZ2UsXG5cdFx0Ly8gXHRcdGNvbXBsZXRlZDogZmtfcmVzb2x2ZSxcblx0XHQvLyBcdH0sXG5cdFx0Ly8gfSk7XG5cdH0pO1xufVxuXG4oZnVuY3Rpb24oKSB7XG5cdC8vIHZlcmJvc2Vcblx0ZG9tbG9nKCdGbG93IHNjcmlwdCBpbml0Jyk7XG5cblx0Ly8gcGFyc2UgcXVlcnkgcGFyYW1zXG5cdGNvbnN0IGhfcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKSk7XG5cblx0Ly8gZW52aXJvbm1lbnQgY2FwdHVyZVxuXHRjb25zdCBzaV9vYmplY3RpdmUgPSBoX3F1ZXJ5LmdldCgnaGVhZGxlc3MnKTtcblx0aWYoc2lfb2JqZWN0aXZlKSB7XG5cdFx0aWYoJ2luZm8nID09PSBzaV9vYmplY3RpdmUpIHtcblx0XHRcdHJldHVybiBjaHJvbWUuc3RvcmFnZS5zZXNzaW9uLnNldCh7XG5cdFx0XHRcdGRpc3BsYXlfaW5mbzoge1xuXHRcdFx0XHRcdHdpZHRoOiBzY3JlZW4ud2lkdGgsXG5cdFx0XHRcdFx0aGVpZ2h0OiBzY3JlZW4uaGVpZ2h0LFxuXHRcdFx0XHRcdGF2YWlsSGVpZ2h0OiBzY3JlZW4uYXZhaWxIZWlnaHQsXG5cdFx0XHRcdFx0YXZhaWxXaWR0aDogc2NyZWVuLmF2YWlsV2lkdGgsXG5cdFx0XHRcdFx0b3JpZW50YXRpb246IHNjcmVlbi5vcmllbnRhdGlvbixcblx0XHRcdFx0XHRkZXZpY2VQaXhlbFJhdGlvOiBkZXZpY2VQaXhlbFJhdGlvLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSkudGhlbigoKSA9PiB7XG5cdFx0XHRcdHdpbmRvdy5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0d2luZG93LmNsb3NlKCk7XG5cdH1cblxuXHQvLyB1c2UgYnJvYWRjYXN0IGNoYW5uZWxcblx0aWYoJ2Jyb2FkY2FzdCcgPT09IGhfcXVlcnkuZ2V0KCdjb21tJykpIHtcblx0XHQvLyB2ZXJib3NlXG5cdFx0ZG9tbG9nKCdVc2luZyBicm9hZGNhc3QgY29tbScpO1xuXG5cdFx0Ly8gcmVmIGNoYW5uZWwgbmFtZVxuXHRcdGNvbnN0IHNpX2NoYW5uZWwgPSBoX3F1ZXJ5LmdldCgnbmFtZScpO1xuXG5cdFx0Ly8gbm8gY2hhbm5lbCBuYW1lXG5cdFx0aWYoJ3N0cmluZycgIT09IHR5cGVvZiBzaV9jaGFubmVsIHx8ICFzaV9jaGFubmVsKSB7XG5cdFx0XHRyZXR1cm4gZG9tbG9nKCdJbnZhbGlkIG9yIG1pc3NpbmcgY2hhbm5lbCBuYW1lJyk7XG5cdFx0fVxuXG5cdFx0Ly8gdmVyYm9zZVxuXHRcdGRvbWxvZyhgQ2hhbm5lbCBuYW1lOiAnJHtzaV9jaGFubmVsfSdgKTtcblxuXHRcdC8vIGNyZWF0ZSBicm9hZGNhc3QgY2hhbm5lbFxuXHRcdGNvbnN0IGRfYnJvYWRjYXN0OiBWb2NhYi5UeXBlZEJyb2FkY2FzdDxJbnRyYUV4dC5GbG93UmVzcG9uc2VWb2NhYiwgSW50cmFFeHQuRmxvd1ZvY2FiPiA9IG5ldyBCcm9hZGNhc3RDaGFubmVsKHNpX2NoYW5uZWwpO1xuXHRcdGNvbnN0IHJlc3BvbmRfYnJvYWRjYXN0OiBDb21wbGV0aW9uUmVzcG9uc2UgPSAoYl9hbnN3ZXIsIGdfcGFnZSkgPT4ge1xuXHRcdFx0Ly8gcG9zdCB0byBicm9hZGNhc3Rcblx0XHRcdGRfYnJvYWRjYXN0LnBvc3RNZXNzYWdlKHtcblx0XHRcdFx0dHlwZTogJ2NvbXBsZXRlRmxvdycsXG5cdFx0XHRcdHZhbHVlOiB7XG5cdFx0XHRcdFx0YW5zd2VyOiBiX2Fuc3dlcixcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBpZiBwYWdlIHN0aWxsIGV4aXN0cyBhZnRlciBzb21lIHRpbWUsIHRoZW4gc2VydmljZSB3b3JrZXIgaXMgZGVhZFxuXHRcdFx0c2V0VGltZW91dChhc3luYygpID0+IHtcblx0XHRcdFx0Ly8gc3VnZ2VzdCByZWxvYWRpbmcgdGhlIHBhZ2Vcblx0XHRcdFx0aWYoZ19wYWdlKSB7XG5cdFx0XHRcdFx0YXdhaXQgc3VnZ2VzdF9yZWxvYWRfcGFnZShnX3BhZ2UpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gdW5sb2FkXG5cdFx0XHRcdGF3YWl0IHVubG9hZCgpO1xuXG5cdFx0XHRcdC8vIHRoZW4gZXhpdFxuXHRcdFx0XHR3aW5kb3cuY2xvc2UoKTtcblx0XHRcdH0sIDIwMCk7XG5cdFx0fTtcblxuXHRcdC8vIGxpc3RlbiBmb3IgbWVzc2FnZSBvbiBicm9hZGNhc3QgY2hhbm5lbFxuXHRcdGRfYnJvYWRjYXN0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGRfZXZlbnQpIHtcblx0XHRcdC8vIHJlZiBtZXNzYWdlIGRhdGFcblx0XHRcdGNvbnN0IGdfbXNnID0gZF9ldmVudC5kYXRhIGFzIHR5cGVvZiBkX2V2ZW50LmRhdGEgfCBudWxsIHwge3R5cGU6IHVuZGVmaW5lZH07XG5cblx0XHRcdC8vIHZlcmJvc2Vcblx0XHRcdGRvbWxvZyhgUmVjZWl2ZWQgPT4gJHtKU09OLnN0cmluZ2lmeShnX21zZyl9YCk7XG5cblx0XHRcdC8vIGludmFsaWQgZXZlbnQgZGF0YVxuXHRcdFx0aWYoIWdfbXNnIHx8ICFnX21zZy50eXBlKSB7XG5cdFx0XHRcdHJldHVybiBkb21sb2coJ0ludmFsaWQgbWVzc2FnZScpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBzYXZlIG1lc3NhZ2UgdG8gc3RvcmFnZVxuXHRcdFx0c2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShzaV9jaGFubmVsLCBKU09OLnN0cmluZ2lmeShnX21zZykpO1xuXG5cdFx0XHQvLyBhY2tub3dsZWRnZSByZWNlaXB0XG5cdFx0XHRkX2Jyb2FkY2FzdC5wb3N0TWVzc2FnZSh7XG5cdFx0XHRcdHR5cGU6ICdhY2tub3dsZWRnZVJlY2VpcHQnLFxuXHRcdFx0XHR2YWx1ZTogZ19tc2csXG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gcm91dGUgbWVzc2FnZVxuXHRcdFx0dm9pZCByb3V0ZV9tZXNzYWdlKGdfbXNnLCByZXNwb25kX2Jyb2FkY2FzdCk7XG5cdFx0fTtcblxuXHRcdC8vIHZlcmJvc2Vcblx0XHRkb21sb2coJ0xpc3RlbmluZyBmb3IgbWVzc2FnZS4uLicpO1xuXG5cdFx0Ly8gcmVhZCBmcm9tIHNlc3Npb24gc3RvcmFnZVxuXHRcdGNvbnN0IHNfcmVsb2FkZWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHNpX2NoYW5uZWwpO1xuXHRcdGlmKHNfcmVsb2FkZWQpIHtcblx0XHRcdC8vIHZlcmJvc2Vcblx0XHRcdGRvbWxvZygnQXR0ZW1wdGluZyB0byByZXN0b3JlIG1lc3NhZ2UgYWZ0ZXIgcmVsb2FkLi4uJyk7XG5cblx0XHRcdC8vIHBhcnNlIG1lc3NhZ2UgZnJvbSBzdG9yYWdlXG5cdFx0XHRsZXQgZ19wYXJzZWQ6IEZsb3dNZXNzYWdlO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Z19wYXJzZWQgPSBKU09OLnBhcnNlKHNfcmVsb2FkZWQpO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2goZV9wYXJzZSkge1xuXHRcdFx0XHRyZXR1cm4gZG9tbG9nKCdGYWlsZWQgdG8gcGFyc2UgbWVzc2FnZSBmcm9tIHNlc3Npb24gc3RvcmFnZScpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyByb3V0ZVxuXHRcdFx0dm9pZCByb3V0ZV9tZXNzYWdlKGdfcGFyc2VkLCByZXNwb25kX2Jyb2FkY2FzdCk7XG5cdFx0fVxuXHR9XG5cdC8vIHVua25vd24gY29tbVxuXHRlbHNlIHtcblx0XHRkb21sb2coYFVua25vd24gY29tbSAnJHtoX3F1ZXJ5LmdldCgnY29tbScpIHx8ICcobnVsbCB8IHVuZGVmaW5lZCknfSdgKTtcblx0fVxufSkoKTtcbiJdLCJuYW1lcyI6WyJjdHgiLCJSZXF1ZXN0Q29ubmVjdGlvblBlcm1pc3Npb25zIiwiU3lzdGVtU3ZlbHRlIiwiQXV0aGVudGljYXRlU3ZlbHRlIiwiUmVxdWVzdEFkdmVydGlzZW1lbnRTdmVsdGUiLCJSZXF1ZXN0Q29ubmVjdGlvblN2ZWx0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O21CQXFIUyxJQUFTOztpQ0FBZCxRQUFJLEtBQUEsR0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQUFDQSxLQUFTOzttQ0FBZCxRQUFJLEtBQUEsR0FBQTs7Ozs7Ozs7Ozs7Ozt3Q0FBSjtBQUFBOzs7Ozs7Ozs7Ozs7OztpQkFFNEMsSUFBUyxNQUFBOzs7Ozs7O2dCQUE5QixnQkFBYzs7O2dCQUF3Qix5QkFDOUQ7Ozs7QUFGQSxhQUVLLFFBQUEsS0FBQSxNQUFBO0FBREosYUFBdUIsS0FBQSxLQUFBOztBQUFj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
