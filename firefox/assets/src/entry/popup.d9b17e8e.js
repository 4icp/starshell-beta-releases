import { S as SvelteComponent, i as init, s as safe_not_equal, c as create_component, m as mount_component, t as transition_in, a as transition_out, d as destroy_component, b as component_subscribe, C as CheckboxField, e as binding_callbacks, f as bind, A as ActionsLine, g as space, h as element, j as insert, k as add_flush_callback, l as detach, y as yw_account_ref, n as Secp256k1Key, o as Secrets, p as buffer_to_string8, q as buffer_to_base64, r as set_store_value, u as Accounts, E as Events, v as text, w as attr, x as noop, W as WebResourceCache, P as P_STARSHELL_DECREES, z as SI_VERSION, B as open_external_link, D as qs, V as Vault, F as global_receive, G as initialize_caches, H as yw_navigator, I as ode, J as register, K as login, X as XT_SECONDS, L as F_NOOP } from "../../web-resource-cache.849924ed.js";
import { S as Screen, H as Header, A as AccountEdit, a as StarShellLogo, b as StarShellTitle, c as Horizon, T as ThreadId, d as dm_log, e as System, f as domlog, B as Blank, P as PreRegister, g as Authenticate } from "../../PreRegister.dcff9f3a.js";
import { s as semver } from "../../index.5cb01ff5.js";
function create_default_slot_1(ctx) {
  let t0;
  let a;
  let t2;
  return {
    c() {
      t0 = text("By checking this box, you agree to the ");
      a = element("a");
      a.textContent = "Terms and Conditions";
      t2 = text(".");
      attr(a, "href", "https://starshell.net/tac.html");
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, a, anchor);
      insert(target, t2, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(a);
      if (detaching)
        detach(t2);
    }
  };
}
function create_default_slot$1(ctx) {
  let header;
  let t0;
  let p0;
  let t2;
  let p1;
  let t4;
  let p2;
  let t6;
  let checkboxfield;
  let updating_checked;
  let t7;
  let actionsline;
  let current;
  header = new Header({ props: { title: "Create a new wallet" } });
  function checkboxfield_checked_binding(value) {
    ctx[4](value);
  }
  let checkboxfield_props = {
    id: "",
    $$slots: { default: [create_default_slot_1] },
    $$scope: { ctx }
  };
  if (ctx[0] !== void 0) {
    checkboxfield_props.checked = ctx[0];
  }
  checkboxfield = new CheckboxField({ props: checkboxfield_props });
  binding_callbacks.push(() => bind(checkboxfield, "checked", checkboxfield_checked_binding));
  actionsline = new ActionsLine({
    props: {
      confirm: [
        "Create new StarShell wallet",
        ctx[2],
        !ctx[0]
      ],
      contd: {
        creator: AccountEdit,
        props: { account: ctx[1] }
      }
    }
  });
  return {
    c() {
      create_component(header.$$.fragment);
      t0 = space();
      p0 = element("p");
      p0.textContent = "This software is currently in beta. Since it has not undergone security audits, importing and exporting of mnemonics and private keys is forbidden.";
      t2 = space();
      p1 = element("p");
      p1.textContent = "This means you will not be able to backup seed phrases, private keys, or use hardware wallets.";
      t4 = space();
      p2 = element("p");
      p2.textContent = "All transactions take place on a test network.";
      t6 = space();
      create_component(checkboxfield.$$.fragment);
      t7 = space();
      create_component(actionsline.$$.fragment);
    },
    m(target, anchor) {
      mount_component(header, target, anchor);
      insert(target, t0, anchor);
      insert(target, p0, anchor);
      insert(target, t2, anchor);
      insert(target, p1, anchor);
      insert(target, t4, anchor);
      insert(target, p2, anchor);
      insert(target, t6, anchor);
      mount_component(checkboxfield, target, anchor);
      insert(target, t7, anchor);
      mount_component(actionsline, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const checkboxfield_changes = {};
      if (dirty & 64) {
        checkboxfield_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_checked && dirty & 1) {
        updating_checked = true;
        checkboxfield_changes.checked = ctx2[0];
        add_flush_callback(() => updating_checked = false);
      }
      checkboxfield.$set(checkboxfield_changes);
      const actionsline_changes = {};
      if (dirty & 1)
        actionsline_changes.confirm = [
          "Create new StarShell wallet",
          ctx2[2],
          !ctx2[0]
        ];
      if (dirty & 2)
        actionsline_changes.contd = {
          creator: AccountEdit,
          props: { account: ctx2[1] }
        };
      actionsline.$set(actionsline_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(header.$$.fragment, local);
      transition_in(checkboxfield.$$.fragment, local);
      transition_in(actionsline.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(header.$$.fragment, local);
      transition_out(checkboxfield.$$.fragment, local);
      transition_out(actionsline.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(header, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(p0);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(p1);
      if (detaching)
        detach(t4);
      if (detaching)
        detach(p2);
      if (detaching)
        detach(t6);
      destroy_component(checkboxfield, detaching);
      if (detaching)
        detach(t7);
      destroy_component(actionsline, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let screen;
  let current;
  screen = new Screen({
    props: {
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(screen.$$.fragment);
    },
    m(target, anchor) {
      mount_component(screen, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const screen_changes = {};
      if (dirty & 67) {
        screen_changes.$$scope = { dirty, ctx: ctx2 };
      }
      screen.$set(screen_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(screen.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(screen.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(screen, detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let $yw_account_ref;
  component_subscribe($$self, yw_account_ref, ($$value) => $$invalidate(1, $yw_account_ref = $$value));
  let { reset = false } = $$props;
  let { b_agreed = false } = $$props;
  async function create_account(p_secret, sa_owner, p_pfp) {
    const p_account = await Accounts.open((ks_accounts) => ks_accounts.put({
      family: "cosmos",
      pubkey: sa_owner,
      secret: p_secret,
      name: "Citizen 1",
      pfp: p_pfp
    }));
    await Events.insert({
      type: "account_created",
      time: Date.now(),
      data: { account: p_account }
    });
    return p_account;
  }
  async function create_private_key() {
    const [kk_sk, k_secp] = await Secp256k1Key.generatePrivateKey(true);
    const s_uuid = crypto.randomUUID();
    const p_secret = await Secrets.open(async (ks) => ks.put({
      type: "private_key",
      data: await kk_sk.access((atu8_sk) => buffer_to_string8(atu8_sk)),
      name: "Auto-generated private key for beta",
      uuid: s_uuid,
      security: { type: "none" }
    }));
    const atu8_pk = k_secp.exportPublicKey();
    const p_account = await create_account(p_secret, buffer_to_base64(atu8_pk), "");
    set_store_value(yw_account_ref, $yw_account_ref = p_account, $yw_account_ref);
  }
  function checkboxfield_checked_binding(value) {
    b_agreed = value;
    $$invalidate(0, b_agreed);
  }
  $$self.$$set = ($$props2) => {
    if ("reset" in $$props2)
      $$invalidate(3, reset = $$props2.reset);
    if ("b_agreed" in $$props2)
      $$invalidate(0, b_agreed = $$props2.b_agreed);
  };
  return [
    b_agreed,
    $yw_account_ref,
    create_private_key,
    reset,
    checkboxfield_checked_binding
  ];
}
class CreateWallet extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { reset: 3, b_agreed: 0 });
  }
}
const R_SEMVER = /^([<>]=?)?(.+)$/;
function satisfies(si_version, s_semver) {
  const [, s_cmp, s_base] = R_SEMVER.exec(s_semver);
  if ("<=" === s_cmp) {
    return semver.lte(si_version, s_base);
  }
  return false;
}
async function check_restrictions() {
  const a_restrictions = [];
  const a_decrees = await WebResourceCache.get(P_STARSHELL_DECREES);
  for (const g_decree of a_decrees || []) {
    if (satisfies(SI_VERSION, g_decree.affects)) {
      switch (g_decree.action) {
        case "restrict": {
          a_restrictions.push(g_decree);
          break;
        }
      }
    }
  }
  return a_restrictions;
}
var Restricted_svelte_svelte_type_style_lang = "";
function create_default_slot(ctx) {
  let starshelllogo;
  let t0;
  let starshelltitle;
  let t1;
  let horizon;
  let t2;
  let div2;
  let t6;
  let p;
  let t7;
  let actionsline;
  let current;
  starshelllogo = new StarShellLogo({ props: { dim: 96 } });
  starshelltitle = new StarShellTitle({});
  horizon = new Horizon({});
  actionsline = new ActionsLine({
    props: {
      confirm: ["See Instructions", ctx[0]]
    }
  });
  return {
    c() {
      create_component(starshelllogo.$$.fragment);
      t0 = space();
      create_component(starshelltitle.$$.fragment);
      t1 = space();
      create_component(horizon.$$.fragment);
      t2 = space();
      div2 = element("div");
      div2.innerHTML = `<div>Please update to continue beta testing.</div> 
		<div>A new version has been released.</div>`;
      t6 = space();
      p = element("p");
      t7 = space();
      create_component(actionsline.$$.fragment);
      attr(div2, "class", "large");
    },
    m(target, anchor) {
      mount_component(starshelllogo, target, anchor);
      insert(target, t0, anchor);
      mount_component(starshelltitle, target, anchor);
      insert(target, t1, anchor);
      mount_component(horizon, target, anchor);
      insert(target, t2, anchor);
      insert(target, div2, anchor);
      insert(target, t6, anchor);
      insert(target, p, anchor);
      insert(target, t7, anchor);
      mount_component(actionsline, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(starshelllogo.$$.fragment, local);
      transition_in(starshelltitle.$$.fragment, local);
      transition_in(horizon.$$.fragment, local);
      transition_in(actionsline.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(starshelllogo.$$.fragment, local);
      transition_out(starshelltitle.$$.fragment, local);
      transition_out(horizon.$$.fragment, local);
      transition_out(actionsline.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(starshelllogo, detaching);
      if (detaching)
        detach(t0);
      destroy_component(starshelltitle, detaching);
      if (detaching)
        detach(t1);
      destroy_component(horizon, detaching);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(div2);
      if (detaching)
        detach(t6);
      if (detaching)
        detach(p);
      if (detaching)
        detach(t7);
      destroy_component(actionsline, detaching);
    }
  };
}
function create_fragment(ctx) {
  let screen;
  let current;
  screen = new Screen({
    props: {
      root: true,
      classNames: "restricted",
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(screen.$$.fragment);
    },
    m(target, anchor) {
      mount_component(screen, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const screen_changes = {};
      if (dirty & 2) {
        screen_changes.$$scope = { dirty, ctx: ctx2 };
      }
      screen.$set(screen_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(screen.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(screen.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(screen, detaching);
    }
  };
}
function instance($$self) {
  const func = () => open_external_link("https://github.com/SolarRepublic/starshell-beta/README.md");
  return [func];
}
class Restricted extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
document.getElementById("factory-reset")?.addEventListener("click", async () => {
  await chrome.storage.session.clear();
  await chrome.storage.local.clear();
  await reload();
});
let yc_system = null;
let i_health = 0;
let b_busy = false;
async function reload() {
  if (b_busy)
    return;
  b_busy = true;
  if (yc_system) {
    try {
      yc_system.$destroy();
    } catch (e_destroy) {
    }
  }
  try {
    qs(document.body, "main")?.remove();
  } catch (e_remove) {
  }
  let b_launch = false;
  let gc_page_start;
  let h_context = {};
  const dk_root = await Vault.getRootKey();
  const a_restrictions = await check_restrictions();
  if (a_restrictions.length) {
    gc_page_start = {
      creator: Restricted
    };
  } else if (dk_root) {
    const f_unregister = global_receive({
      logout() {
        f_unregister();
        void reload();
      }
    });
    await initialize_caches();
    const ks_accounts = await Accounts.read();
    if (!Object.keys(ks_accounts.raw).length) {
      gc_page_start = {
        creator: CreateWallet
      };
      h_context = {
        completed: reload
      };
    } else {
      gc_page_start = {
        creator: Blank
      };
      b_launch = true;
    }
  } else {
    const f_unregister = global_receive({
      login() {
        f_unregister();
        void reload();
      }
    });
    const g_root = await Vault.getBase();
    if (!g_root) {
      gc_page_start = {
        creator: PreRegister
      };
    } else {
      gc_page_start = {
        creator: Authenticate
      };
    }
    h_context = {
      completed: F_NOOP
    };
  }
  let b_initialized = false;
  const f_unsubscribe = yw_navigator.subscribe((k_navigator) => {
    if (!b_initialized) {
      b_initialized = true;
      return;
    }
    if (k_navigator) {
      f_unsubscribe();
      if (b_launch) {
        k_navigator.activateThread(ThreadId.TOKENS);
      } else {
        k_navigator.activateThread(ThreadId.INIT);
      }
      try {
        dm_log.style.display = "none";
      } catch (e_hide) {
      }
    }
  });
  yc_system = new System({
    target: document.body,
    props: {
      mode: "app",
      page: gc_page_start
    },
    context: new Map(ode(h_context))
  });
  clearTimeout(i_health);
  b_busy = false;
}
if ("localhost" === location.hostname) {
  const h_params = Object.fromEntries(new URLSearchParams(location.search.slice(1)).entries());
  if (h_params["autoskip"]) {
    console.log("Autoskipping registration");
    (async () => {
      localStorage.clear();
      await register("     ");
      await login("     ");
      void reload();
    })();
  } else {
    void reload();
  }
} else {
  i_health = globalThis.setTimeout(() => {
    domlog("Fatal time out, likely caused by an uncaught error.");
  }, 15 * XT_SECONDS);
  try {
    void reload();
  } catch (e_load) {
    debugger;
    console.error(e_load);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuZDliMTdlOGUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvc2NyZWVuL0NyZWF0ZVdhbGxldC5zdmVsdGUiLCIuLi8uLi8uLi8uLi8uLi9zcmMvZXh0ZW5zaW9uL3Jlc3RyaWN0aW9ucy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvc2NyZWVuL1Jlc3RyaWN0ZWQuc3ZlbHRlIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2VudHJ5L3BvcHVwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCB7eXdfYWNjb3VudF9yZWZ9IGZyb20gJyMjL21lbSc7XG5cdGltcG9ydCB0eXBlIHsgQWNjb3VudCwgQWNjb3VudFBhdGggfSBmcm9tICcjL21ldGEvYWNjb3VudCc7XG5cdGltcG9ydCB0eXBlIHsgUGZwLCBQZnBQYXRoIH0gZnJvbSAnIy9tZXRhL3BmcCc7XG5cdGltcG9ydCB0eXBlIHsgUmVzb3VyY2UgfSBmcm9tICcjL21ldGEvcmVzb3VyY2UnO1xuXHRpbXBvcnQgeyBBY2NvdW50cyB9IGZyb20gJyMvc3RvcmUvYWNjb3VudHMnO1xuXHRpbXBvcnQgeyBTZWNyZXRzIH0gZnJvbSAnIy9zdG9yZS9zZWNyZXRzJztcblx0aW1wb3J0IHsgb2RlIH0gZnJvbSAnIy91dGlsL2JlbHQnO1xuXHRpbXBvcnQgeyBidWZmZXJfdG9fYmFzZTY0LCBidWZmZXJfdG9fc3RyaW5nOCB9IGZyb20gJyMvdXRpbC9kYXRhJztcblx0aW1wb3J0IEFjdGlvbnNMaW5lIGZyb20gJy4uL3VpL0FjdGlvbnNMaW5lLnN2ZWx0ZSc7XG5cdGltcG9ydCBDaGVja2JveEZpZWxkIGZyb20gJy4uL3VpL0NoZWNrYm94RmllbGQuc3ZlbHRlJztcblx0aW1wb3J0IHsgSGVhZGVyLCBTY3JlZW4gfSBmcm9tICcuL19zY3JlZW5zJztcblxuXHRpbXBvcnQgeyBTZWNwMjU2azFLZXkgfSBmcm9tICcjL2NyeXB0by9zZWNwMjU2azEnO1xuXHRpbXBvcnQgdHlwZSB7IFNlY3JldCwgU2VjcmV0UGF0aCB9IGZyb20gJyMvbWV0YS9zZWNyZXQnO1xuXHRpbXBvcnQgQWNjb3VudEVkaXQgZnJvbSAnLi9BY2NvdW50RWRpdC5zdmVsdGUnO1xuXHRpbXBvcnQgeyBFdmVudHMgfSBmcm9tICcjL3N0b3JlL2V2ZW50cyc7XG5cblxuXHRleHBvcnQgbGV0IHJlc2V0ID0gZmFsc2U7XG5cblx0ZXhwb3J0IGxldCBiX2FncmVlZCA9IGZhbHNlO1xuXG5cdGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZV9hY2NvdW50KHBfc2VjcmV0OiBTZWNyZXRQYXRoLCBzYV9vd25lcjogc3RyaW5nLCBwX3BmcDogUGZwUGF0aCk6IFByb21pc2U8QWNjb3VudFBhdGg+IHtcblx0XHQvLyBvcGVuIGFjY291bnRzIHN0b3JlIGFuZCBzYXZlIG5ldyBhY2NvdW50XG5cdFx0Y29uc3QgcF9hY2NvdW50ID0gYXdhaXQgQWNjb3VudHMub3Blbihrc19hY2NvdW50cyA9PiBrc19hY2NvdW50cy5wdXQoe1xuXHRcdFx0ZmFtaWx5OiAnY29zbW9zJyxcblx0XHRcdHB1YmtleTogc2Ffb3duZXIsXG5cdFx0XHRzZWNyZXQ6IHBfc2VjcmV0LFxuXHRcdFx0bmFtZTogJ0NpdGl6ZW4gMScsXG5cdFx0XHRwZnA6IHBfcGZwLFxuXHRcdH0pKTtcblxuXHRcdC8vIGNyZWF0ZSBldmVudFxuXHRcdGF3YWl0IEV2ZW50cy5pbnNlcnQoe1xuXHRcdFx0dHlwZTogJ2FjY291bnRfY3JlYXRlZCcsXG5cdFx0XHR0aW1lOiBEYXRlLm5vdygpLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRhY2NvdW50OiBwX2FjY291bnQsXG5cdFx0XHR9LFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHBfYWNjb3VudDtcblx0fVxuXG5cdGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZV9wcml2YXRlX2tleSgpIHtcblx0XHQvLyBnZW5lcmF0ZSBuZXcgcHJpdmF0ZSBrZXlcblx0XHRjb25zdCBba2tfc2ssIGtfc2VjcF0gPSBhd2FpdCBTZWNwMjU2azFLZXkuZ2VuZXJhdGVQcml2YXRlS2V5KHRydWUpO1xuXG5cdFx0Ly8gZ2VuZXJhdGUgbmV3IHV1aWQgZm9yIHRoZSBzZWNyZXRcblx0XHRjb25zdCBzX3V1aWQgPSBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuXG5cdFx0Ly8gc2F2ZSBwcml2YXRlIGtleSB0byBzZWNyZXRzIHN0b3JlXG5cdFx0Y29uc3QgcF9zZWNyZXQgPSBhd2FpdCBTZWNyZXRzLm9wZW4oYXN5bmMga3MgPT4ga3MucHV0KHtcblx0XHRcdHR5cGU6ICdwcml2YXRlX2tleScsXG5cdFx0XHRkYXRhOiBhd2FpdCBra19zay5hY2Nlc3MoYXR1OF9zayA9PiBidWZmZXJfdG9fc3RyaW5nOChhdHU4X3NrKSksXG5cdFx0XHRuYW1lOiAnQXV0by1nZW5lcmF0ZWQgcHJpdmF0ZSBrZXkgZm9yIGJldGEnLFxuXHRcdFx0dXVpZDogc191dWlkLFxuXHRcdFx0c2VjdXJpdHk6IHtcblx0XHRcdFx0dHlwZTogJ25vbmUnLFxuXHRcdFx0fSxcblx0XHR9KSk7XG5cblx0XHQvLyBleHBvcnQgcHVibGljIGtleVxuXHRcdGNvbnN0IGF0dThfcGsgPSBrX3NlY3AuZXhwb3J0UHVibGljS2V5KCk7XG5cblx0XHQvLyBcblx0XHRjb25zdCBwX2FjY291bnQgPSBhd2FpdCBjcmVhdGVfYWNjb3VudChwX3NlY3JldCwgYnVmZmVyX3RvX2Jhc2U2NChhdHU4X3BrKSwgJycpO1xuXG5cdFx0Ly8gc2V0IGFjY291bnRcblx0XHQkeXdfYWNjb3VudF9yZWYgPSBwX2FjY291bnQ7XG5cdH1cblx0Ly8gYXN5bmMgZnVuY3Rpb24gY3JlYXRlX3NlZWQoKSB7XG5cdC8vIFx0Ly8gY3JlYXRlIG5ldyBtbmVtb25pY1xuXHQvLyBcdGNvbnN0IGtuX3BhZGRlZCA9IGF3YWl0IGJpcDM5RW50cm9weVRvUGFkZGVkTW5lbW9uaWMoU2Vuc2l0aXZlQnl0ZXMucmFuZG9tKDMyKSk7XG5cblx0Ly8gXHQvLyBzYXZlIHBhZGRlZCBtbmVtb25pYyB0byBzZWNyZXRzIHN0b3JlXG5cdC8vIFx0YXdhaXQgU2VjcmV0cy5vcGVuKGtzID0+IGtzLmFkZCh7XG5cdC8vIFx0XHR0eXBlOiAnbW5lbW9uaWMnLFxuXHQvLyBcdFx0ZGF0YTogYnVmZmVyX3RvX3N0cmluZzgoa25fcGFkZGVkLmRhdGEpLFxuXHQvLyBcdFx0aGludDogJycsXG5cdC8vIFx0XHRuYW1lOiAnTW5lbW9uaWMgS2V5IGZvciBCZXRhJyxcblx0Ly8gXHRcdHV1aWQ6IGNyeXB0by5yYW5kb21VVUlEKCksXG5cdC8vIFx0XHRzZWN1cml0eToge1xuXHQvLyBcdFx0XHR0eXBlOiAnbm9uZScsXG5cdC8vIFx0XHR9LFxuXHQvLyBcdH0pKTtcblxuXHQvLyBcdC8vIHRyaW0gcGFkZGVkIG1uZW1vbmljXG5cdC8vIFx0Y29uc3Qga25fdHJpbW1lZCA9IHRyaW1QYWRkZWRNbmVtb25pYyhrbl9wYWRkZWQpO1xuXG5cdC8vIFx0Ly8gZ2VuZXJhdGUgc2VlZFxuXHQvLyBcdGNvbnN0IGtrX3NlZWQgPSBhd2FpdCBiaXAzOU1uZW1vbmljVG9TZWVkKCgpID0+IGtuX3RyaW1tZWQuZGF0YSwgKCkgPT4gVWludDhBcnJheS5mcm9tKFtdKSk7XG5cblxuXHQvLyBcdC8vIGRlcml2ZSBhY2NvdW50XG5cdC8vIFx0Y29uc3QgeV9iaXAzMiA9IEJJUDMyRmFjdG9yeShlY2MpO1xuXHQvLyBcdGF3YWl0IGtrX3NlZWQuYWNjZXNzKChhdHU4X3NlZWQpID0+IHtcblx0Ly8gXHRcdGNvbnN0IHlfbWFzdGVyID0geV9iaXAzMi5mcm9tU2VlZChhdHU4X3NlZWQgYXMgQnVmZmVyKTtcblx0Ly8gXHRcdGNvbnN0IHN4X2JpcDQ0OiBCaXA0NFBhdGggPSBgbS80NCcvNTI5Jy8wJy8wLzBgO1xuXHQvLyBcdFx0eV9tYXN0ZXIuZGVyaXZlUGF0aChzeF9iaXA0NCkucHJpdmF0ZUtleTtcblx0Ly8gXHR9KTtcblxuXHQvLyBcdC8vIGNyZWF0ZSBhY2NvdW50IHVzaW5nIG5ldyBzZWVkXG5cdC8vIFx0YXdhaXQgY3JlYXRlX2FjY291bnQoKTtcblx0Ly8gfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwibGVzc1wiPlxuXHQuaWNvbiB7XG5cdFx0cGFkZGluZy10b3A6IDI1JTtcblx0fVxuPC9zdHlsZT5cblxuPFNjcmVlbj5cblx0PEhlYWRlclxuXHRcdHRpdGxlPVwiQ3JlYXRlIGEgbmV3IHdhbGxldFwiXG5cdC8+XG5cblx0PHA+XG5cdFx0VGhpcyBzb2Z0d2FyZSBpcyBjdXJyZW50bHkgaW4gYmV0YS4gU2luY2UgaXQgaGFzIG5vdCB1bmRlcmdvbmUgc2VjdXJpdHkgYXVkaXRzLCBpbXBvcnRpbmcgYW5kIGV4cG9ydGluZyBvZiBtbmVtb25pY3MgYW5kIHByaXZhdGUga2V5cyBpcyBmb3JiaWRkZW4uXG5cdDwvcD5cblxuXHQ8cD5cblx0XHRUaGlzIG1lYW5zIHlvdSB3aWxsIG5vdCBiZSBhYmxlIHRvIGJhY2t1cCBzZWVkIHBocmFzZXMsIHByaXZhdGUga2V5cywgb3IgdXNlIGhhcmR3YXJlIHdhbGxldHMuXG5cdDwvcD5cblxuXHQ8cD5cblx0XHRBbGwgdHJhbnNhY3Rpb25zIHRha2UgcGxhY2Ugb24gYSB0ZXN0IG5ldHdvcmsuXG5cdDwvcD5cblxuXHQ8Q2hlY2tib3hGaWVsZCBpZD1cIlwiIGJpbmQ6Y2hlY2tlZD17Yl9hZ3JlZWR9PlxuXHRcdEJ5IGNoZWNraW5nIHRoaXMgYm94LCB5b3UgYWdyZWUgdG8gdGhlIDxhIGhyZWY9XCJodHRwczovL3N0YXJzaGVsbC5uZXQvdGFjLmh0bWxcIj5UZXJtcyBhbmQgQ29uZGl0aW9uczwvYT4uXG5cdDwvQ2hlY2tib3hGaWVsZD5cblxuXHQ8QWN0aW9uc0xpbmUgY29uZmlybT17WydDcmVhdGUgbmV3IFN0YXJTaGVsbCB3YWxsZXQnLCBjcmVhdGVfcHJpdmF0ZV9rZXksICFiX2FncmVlZF19IGNvbnRkPXt7XG5cdFx0Y3JlYXRvcjogQWNjb3VudEVkaXQsXG5cdFx0cHJvcHM6IHtcblx0XHRcdGFjY291bnQ6ICR5d19hY2NvdW50X3JlZixcblx0XHR9LFxuXHR9fSAvPlxuXG48L1NjcmVlbj4iLCJpbXBvcnQge1BfU1RBUlNIRUxMX0RFQ1JFRVMsIFNJX1ZFUlNJT059IGZyb20gJyMvc2hhcmUvY29uc3RhbnRzJztcbmltcG9ydCB7RGVjcmVlLCBXZWJSZXNvdXJjZUNhY2hlfSBmcm9tICcjL3N0b3JlL3dlYi1yZXNvdXJjZS1jYWNoZSc7XG5cbmltcG9ydCAqIGFzIHNlbXZlciBmcm9tICdzZW12ZXInO1xuXG5jb25zdCBSX1NFTVZFUiA9IC9eKFs8Pl09Pyk/KC4rKSQvO1xuXG5mdW5jdGlvbiBzYXRpc2ZpZXMoc2lfdmVyc2lvbjogc3RyaW5nLCBzX3NlbXZlcjogc3RyaW5nKTogYm9vbGVhbiB7XG5cdGNvbnN0IFssIHNfY21wLCBzX2Jhc2VdID0gUl9TRU1WRVIuZXhlYyhzX3NlbXZlcikhO1xuXHRpZignPD0nID09PSBzX2NtcCkge1xuXHRcdHJldHVybiBzZW12ZXIubHRlKHNpX3ZlcnNpb24sIHNfYmFzZSk7XG5cdH1cblxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja19yZXN0cmljdGlvbnMoKTogUHJvbWlzZTxEZWNyZWVbXT4ge1xuXHRjb25zdCBhX3Jlc3RyaWN0aW9uczogRGVjcmVlW10gPSBbXTtcblxuXHRjb25zdCBhX2RlY3JlZXMgPSBhd2FpdCBXZWJSZXNvdXJjZUNhY2hlLmdldChQX1NUQVJTSEVMTF9ERUNSRUVTKSBhcyBEZWNyZWVbXTtcblxuXHQvLyBlYWNoIGRlY3JlZVxuXHRmb3IoY29uc3QgZ19kZWNyZWUgb2YgYV9kZWNyZWVzIHx8IFtdKSB7XG5cdFx0Ly8gYWZmZWN0cyB0aGlzIHZlcnNpb25cblx0XHRpZihzYXRpc2ZpZXMoU0lfVkVSU0lPTiwgZ19kZWNyZWUuYWZmZWN0cykpIHtcblx0XHRcdC8vIGRlcGVuZGluZyBvbiBhY3Rpb25cblx0XHRcdHN3aXRjaChnX2RlY3JlZS5hY3Rpb24pIHtcblx0XHRcdFx0Ly8gcmVzdHJpY3QgdXNhZ2Vcblx0XHRcdFx0Y2FzZSAncmVzdHJpY3QnOiB7XG5cdFx0XHRcdFx0YV9yZXN0cmljdGlvbnMucHVzaChnX2RlY3JlZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0Ly8gaWdub3JlXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYV9yZXN0cmljdGlvbnM7XG59XG4iLCI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgeyBTY3JlZW4gfSBmcm9tICcuL19zY3JlZW5zJztcblxuXHRpbXBvcnQgQWN0aW9uc0xpbmUgZnJvbSAnLi4vdWkvQWN0aW9uc0xpbmUuc3ZlbHRlJztcblx0aW1wb3J0IFN0YXJTaGVsbExvZ28gZnJvbSAnLi4vdWkvU3RhclNoZWxsTG9nby5zdmVsdGUnO1xuXHRpbXBvcnQgU3RhclNoZWxsVGl0bGUgZnJvbSAnLi4vdWkvU3RhclNoZWxsVGl0bGUuc3ZlbHRlJztcblx0aW1wb3J0IEhvcml6b24gZnJvbSAnLi4vdWkvSG9yaXpvbi5zdmVsdGUnO1xuXHRpbXBvcnQgeyBvcGVuX2V4dGVybmFsX2xpbmsgfSBmcm9tICcjL3V0aWwvZG9tJztcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cImxlc3NcIj5cblx0QGltcG9ydCAnLi4vLi4vc3R5bGUvdXRpbC5sZXNzJztcblxuXHQ6Z2xvYmFsKC5yZXN0cmljdGVkKSB7XG5cdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0Z2FwOiAyMHB4O1xuXHRcdHBhZGRpbmctbGVmdDogMTZweDtcblx0XHRwYWRkaW5nLXJpZ2h0OiAxNnB4O1xuXHRcdGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG5cdFx0YmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIHRvcDtcblx0XHRiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuXG5cdFx0cGFkZGluZy10b3A6IGNhbGMoNTB2aCAtIDE1MHB4KTtcblx0fVxuPC9zdHlsZT5cblxuPFNjcmVlbiByb290IGNsYXNzTmFtZXM9J3Jlc3RyaWN0ZWQnPlxuXHQ8U3RhclNoZWxsTG9nbyBkaW09ezk2fSAvPlxuXG5cdDxTdGFyU2hlbGxUaXRsZSAvPlxuXG5cdDxIb3Jpem9uIC8+XG5cblx0PGRpdiBjbGFzcz1cImxhcmdlXCI+XG5cdFx0PGRpdj5QbGVhc2UgdXBkYXRlIHRvIGNvbnRpbnVlIGJldGEgdGVzdGluZy48L2Rpdj5cblx0XHQ8ZGl2PkEgbmV3IHZlcnNpb24gaGFzIGJlZW4gcmVsZWFzZWQuPC9kaXY+XG5cdDwvZGl2PlxuXG5cdDxwPlxuXHRcdFxuXHQ8L3A+XG5cblx0PEFjdGlvbnNMaW5lIGNvbmZpcm09e1snU2VlIEluc3RydWN0aW9ucycsICgpID0+IG9wZW5fZXh0ZXJuYWxfbGluaygnaHR0cHM6Ly9naXRodWIuY29tL1NvbGFyUmVwdWJsaWMvc3RhcnNoZWxsLWJldGEvUkVBRE1FLm1kJyldfSAvPlxuPC9TY3JlZW4+XG4iLCJpbXBvcnQgU3lzdGVtU3ZlbHRlIGZyb20gJyMvYXBwL2NvbnRhaW5lci9TeXN0ZW0uc3ZlbHRlJztcbmltcG9ydCBCbGFua1N2ZWx0ZSBmcm9tICcjL2FwcC9zY3JlZW4vQmxhbmsuc3ZlbHRlJztcbmltcG9ydCBBdXRoZW50aWNhdGVTdmVsdGUgZnJvbSAnIy9hcHAvc2NyZWVuL0F1dGhlbnRpY2F0ZS5zdmVsdGUnO1xuXG5cbmltcG9ydCB0eXBlIHsgU3ZlbHRlQ29tcG9uZW50IH0gZnJvbSAnc3ZlbHRlJztcbmltcG9ydCB0eXBlIHsgUGFnZUNvbmZpZyB9IGZyb20gJyMvYXBwL25hdi9wYWdlJztcbmltcG9ydCB7IFZhdWx0IH0gZnJvbSAnIy9jcnlwdG8vdmF1bHQnO1xuaW1wb3J0IHsgcXMgfSBmcm9tICcjL3V0aWwvZG9tJztcbmltcG9ydCB7IGluaXRpYWxpemVfY2FjaGVzLCB5d19uYXZpZ2F0b3IgfSBmcm9tICcjL2FwcC9tZW0nO1xuaW1wb3J0IHsgVGhyZWFkSWQgfSBmcm9tICcjL2FwcC9kZWYnO1xuaW1wb3J0IHsgRl9OT09QLCBvZGUgfSBmcm9tICcjL3V0aWwvYmVsdCc7XG5pbXBvcnQgeyBkbV9sb2csIGRvbWxvZyB9IGZyb20gJy4vZmFsbGJhY2snO1xuaW1wb3J0IFByZVJlZ2lzdGVyU3ZlbHRlIGZyb20gJyMvYXBwL3NjcmVlbi9QcmVSZWdpc3Rlci5zdmVsdGUnO1xuaW1wb3J0IHsgZ2xvYmFsX3JlY2VpdmUgfSBmcm9tICcjL3NjcmlwdC9tc2ctZ2xvYmFsJztcbmltcG9ydCB7IEFjY291bnRzIH0gZnJvbSAnIy9zdG9yZS9hY2NvdW50cyc7XG5pbXBvcnQgQ3JlYXRlV2FsbGV0U3ZlbHRlIGZyb20gJyMvYXBwL3NjcmVlbi9DcmVhdGVXYWxsZXQuc3ZlbHRlJztcbmltcG9ydCB7IGxvZ2luLCByZWdpc3RlciB9IGZyb20gJyMvc2hhcmUvYXV0aCc7XG5pbXBvcnQgeyBYVF9TRUNPTkRTIH0gZnJvbSAnIy9zaGFyZS9jb25zdGFudHMnO1xuaW1wb3J0IHsgY2hlY2tfcmVzdHJpY3Rpb25zIH0gZnJvbSAnIy9leHRlbnNpb24vcmVzdHJpY3Rpb25zJztcbmltcG9ydCBSZXN0cmljdGVkU3ZlbHRlIGZyb20gJyMvYXBwL3NjcmVlbi9SZXN0cmljdGVkLnN2ZWx0ZSc7XG5pbXBvcnQgeyBXZWJSZXNvdXJjZUNhY2hlIH0gZnJvbSAnIy9zdG9yZS93ZWItcmVzb3VyY2UtY2FjaGUnO1xuXG4vLyBiaW5kIGZhY3RvcnkgcmVzZXQgYnV0dG9uXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjdG9yeS1yZXNldCcpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jKCkgPT4ge1xuXHRhd2FpdCBjaHJvbWUuc3RvcmFnZS5zZXNzaW9uLmNsZWFyKCk7XG5cdGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmNsZWFyKCk7XG5cdGF3YWl0IHJlbG9hZCgpO1xufSk7XG5cbi8vIHRvcC1sZXZlbCBzeXN0ZW0gY29tcG9uZW50XG5sZXQgeWNfc3lzdGVtOiBTdmVsdGVDb21wb25lbnQgfCBudWxsID0gbnVsbDtcblxuLy8gaGVhbHRoIGNoZWNrIHRpbWVyXG5sZXQgaV9oZWFsdGggPSAwO1xuXG4vLyBidXN5IHJlbG9hZGluZ1xubGV0IGJfYnVzeSA9IGZhbHNlO1xuXG4vLyByZWxvYWQgdGhlIGVudGlyZSBzeXN0ZW1cbmFzeW5jIGZ1bmN0aW9uIHJlbG9hZCgpIHtcblx0aWYoYl9idXN5KSByZXR1cm47XG5cblx0Yl9idXN5ID0gdHJ1ZTtcblxuXHQvLyBkZXN0cm95IHByZXZpb3VzIHN5c3RlbVxuXHRpZih5Y19zeXN0ZW0pIHtcblx0XHR0cnkge1xuXHRcdFx0eWNfc3lzdGVtLiRkZXN0cm95KCk7XG5cdFx0fVxuXHRcdGNhdGNoKGVfZGVzdHJveSkge31cblx0fVxuXG5cdC8vIHJlbW92ZSBzdGFsZSBkb21cblx0dHJ5IHtcblx0XHRxcyhkb2N1bWVudC5ib2R5LCAnbWFpbicpPy5yZW1vdmUoKTtcblx0fVxuXHRjYXRjaChlX3JlbW92ZSkge31cblxuXHQvLyBsYXVuY2ggYXBwXG5cdGxldCBiX2xhdW5jaCA9IGZhbHNlO1xuXG5cdC8vIHN0YXJ0IHBhZ2Vcblx0bGV0IGdjX3BhZ2Vfc3RhcnQ6IFBhZ2VDb25maWc7XG5cblx0Ly8gY29udGV4dFxuXHRsZXQgaF9jb250ZXh0ID0ge307XG5cblx0Ly8gY2hlY2sgaWYgcm9vdCBrZXkgaXMgYWNjZXNzaWJsZVxuXHRjb25zdCBka19yb290ID0gYXdhaXQgVmF1bHQuZ2V0Um9vdEtleSgpO1xuXG5cdC8vIHJlc3RyaWN0aW9uc1xuXHRjb25zdCBhX3Jlc3RyaWN0aW9ucyA9IGF3YWl0IGNoZWNrX3Jlc3RyaWN0aW9ucygpO1xuXHRpZihhX3Jlc3RyaWN0aW9ucy5sZW5ndGgpIHtcblx0XHRnY19wYWdlX3N0YXJ0ID0ge1xuXHRcdFx0Y3JlYXRvcjogUmVzdHJpY3RlZFN2ZWx0ZSxcblx0XHR9O1xuXHR9XG5cdC8vIHZhdWx0IGlzIHVubG9ja2VkXG5cdGVsc2UgaWYoZGtfcm9vdCkge1xuXHRcdC8vIHJlZ2lzdGVyIGZvciBnbG9iYWwgZXZlbnRzXG5cdFx0Y29uc3QgZl91bnJlZ2lzdGVyID0gZ2xvYmFsX3JlY2VpdmUoe1xuXHRcdFx0Ly8gc3lzdGVtIHJlY2VpdmVkIGxvZ291dCBjb21tYW5kXG5cdFx0XHRsb2dvdXQoKSB7XG5cdFx0XHRcdC8vIHVucmVnaXN0ZXIgdGhpcyBsaXN0ZW5lclxuXHRcdFx0XHRmX3VucmVnaXN0ZXIoKTtcblxuXHRcdFx0XHQvLyByZWxvYWQgc3lzdGVtXG5cdFx0XHRcdHZvaWQgcmVsb2FkKCk7XG5cdFx0XHR9LFxuXHRcdH0pO1xuXG5cdFx0Ly8gbG9hZCBjYWNoZXNcblx0XHRhd2FpdCBpbml0aWFsaXplX2NhY2hlcygpO1xuXG5cdFx0Ly8gY2hlY2sgZm9yIGFjY291bnQocylcblx0XHRjb25zdCBrc19hY2NvdW50cyA9IGF3YWl0IEFjY291bnRzLnJlYWQoKTtcblxuXHRcdC8vIG5vIGFjY291bnRzOyBsb2FkIGFjY291bnQgY3JlYXRpb25cblx0XHRpZighT2JqZWN0LmtleXMoa3NfYWNjb3VudHMucmF3KS5sZW5ndGgpIHtcblx0XHRcdGdjX3BhZ2Vfc3RhcnQgPSB7XG5cdFx0XHRcdGNyZWF0b3I6IENyZWF0ZVdhbGxldFN2ZWx0ZSxcblx0XHRcdH07XG5cblx0XHRcdC8vIHNldCBjb21wbGV0ZSBmdW5jdGlvbiBpbiBjb250ZXh0XG5cdFx0XHRoX2NvbnRleHQgPSB7XG5cdFx0XHRcdGNvbXBsZXRlZDogcmVsb2FkLFxuXHRcdFx0XHQvLyBjb21wbGV0ZWQ6IEZfTk9PUCxcblx0XHRcdH07XG5cdFx0fVxuXHRcdC8vIGFjY291bnQgZXhpc3RzOyBsb2FkIGRlZmF1bHQgaG9tZXNjcmVlblxuXHRcdGVsc2Uge1xuXHRcdFx0Z2NfcGFnZV9zdGFydCA9IHtcblx0XHRcdFx0Y3JlYXRvcjogQmxhbmtTdmVsdGUsXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBsYXVuY2ggaG9tZXNjcmVlblxuXHRcdFx0Yl9sYXVuY2ggPSB0cnVlO1xuXHRcdH1cblx0fVxuXHQvLyB2YXVsdCBpcyBsb2NrZWRcblx0ZWxzZSB7XG5cdFx0Ly8gcmVnaXN0ZXIgZm9yIGdsb2JhbCBldmVudHNcblx0XHRjb25zdCBmX3VucmVnaXN0ZXIgPSBnbG9iYWxfcmVjZWl2ZSh7XG5cdFx0XHQvLyBzeXN0ZW0gcmVjZWl2ZWQgbG9naW4gY29tbWFuZFxuXHRcdFx0bG9naW4oKSB7XG5cdFx0XHRcdC8vIHVucmVnaXN0ZXIgdGhpcyBsaXN0ZW5lclxuXHRcdFx0XHRmX3VucmVnaXN0ZXIoKTtcblxuXHRcdFx0XHQvLyByZWxvYWQgc3lzdGVtXG5cdFx0XHRcdHZvaWQgcmVsb2FkKCk7XG5cdFx0XHR9LFxuXHRcdH0pO1xuXG5cdFx0Ly8gcmV0cmlldmUgcm9vdFxuXHRcdGNvbnN0IGdfcm9vdCA9IGF3YWl0IFZhdWx0LmdldEJhc2UoKTtcblxuXHRcdC8vIG5vIHJvb3Qgc2V0LCBuZWVkIHRvIHJlZ2lzdGVyXG5cdFx0aWYoIWdfcm9vdCkge1xuXHRcdFx0Z2NfcGFnZV9zdGFydCA9IHtcblx0XHRcdFx0Y3JlYXRvcjogUHJlUmVnaXN0ZXJTdmVsdGUsXG5cdFx0XHR9O1xuXHRcdH1cblx0XHQvLyByb290IGlzIHNldCwgbmVlZCB0byBhdXRoZW50aWNhdGVcblx0XHRlbHNlIHtcblx0XHRcdGdjX3BhZ2Vfc3RhcnQgPSB7XG5cdFx0XHRcdGNyZWF0b3I6IEF1dGhlbnRpY2F0ZVN2ZWx0ZSxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gaW4gZWl0aGVyIGNhc2UsIHNldCBjb21wbGV0ZSBmdW5jdGlvbiBpbiBjb250ZXh0XG5cdFx0aF9jb250ZXh0ID0ge1xuXHRcdFx0Ly8gY29tcGxldGVkOiByZWxvYWQsXG5cdFx0XHRjb21wbGV0ZWQ6IEZfTk9PUCxcblx0XHR9O1xuXHR9XG5cblx0Ly8gd2FpdCBmb3IgbmF2aWdhdG9yIHRvIGJlIGluaXRpYWxpemVkXG5cdGxldCBiX2luaXRpYWxpemVkID0gZmFsc2U7XG5cdGNvbnN0IGZfdW5zdWJzY3JpYmUgPSB5d19uYXZpZ2F0b3Iuc3Vic2NyaWJlKChrX25hdmlnYXRvcikgPT4ge1xuXHRcdC8vIHJ1bm5lciBnZXRzIGNhbGxlZCBpbW1lZGlhdGVseSwgYnV0IHN5c3RlbSBoYXMgbm90IHVwZGF0ZWQgbmF2aWdhdG9yIHlldFxuXHRcdGlmKCFiX2luaXRpYWxpemVkKSB7XG5cdFx0XHRiX2luaXRpYWxpemVkID0gdHJ1ZTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBzeXN0ZW0gdXBkYXRlZCBuYXZpZ2F0b3Jcblx0XHRpZihrX25hdmlnYXRvcikge1xuXHRcdFx0Ly8gdW5zdWJzY3JpYmUgZnJvbSByZWFjdGl2ZSB1cGRhdGVzXG5cdFx0XHRmX3Vuc3Vic2NyaWJlKCk7XG5cblx0XHRcdC8vIGxhdW5jaCB0byBob21lc2NyZWVuXG5cdFx0XHRpZihiX2xhdW5jaCkge1xuXHRcdFx0XHRrX25hdmlnYXRvci5hY3RpdmF0ZVRocmVhZChUaHJlYWRJZC5UT0tFTlMpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gbGF1bmNoIHRvIGluaXQgdGhyZWFkXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0a19uYXZpZ2F0b3IuYWN0aXZhdGVUaHJlYWQoVGhyZWFkSWQuSU5JVCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGF0dGVtcHQgdG8gaGlkZSBsb2dcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGRtX2xvZyEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdH1cblx0XHRcdGNhdGNoKGVfaGlkZSkge31cblx0XHR9XG5cdH0pO1xuXG5cdC8vIGNyZWF0ZSBzeXN0ZW0gY29tcG9uZW50XG5cdHljX3N5c3RlbSA9IG5ldyBTeXN0ZW1TdmVsdGUoe1xuXHRcdHRhcmdldDogZG9jdW1lbnQuYm9keSxcblx0XHRwcm9wczoge1xuXHRcdFx0bW9kZTogJ2FwcCcsXG5cdFx0XHRwYWdlOiBnY19wYWdlX3N0YXJ0LFxuXHRcdH0sXG5cdFx0Y29udGV4dDogbmV3IE1hcChvZGUoaF9jb250ZXh0KSksXG5cdH0pO1xuXG5cdC8vIGNsZWFyIGhlYWx0aCBjaGVja1xuXHRjbGVhclRpbWVvdXQoaV9oZWFsdGgpO1xuXG5cdGJfYnVzeSA9IGZhbHNlO1xufVxuXG5cbi8vIGRldlxuaWYoJ2xvY2FsaG9zdCcgPT09IGxvY2F0aW9uLmhvc3RuYW1lKSB7XG5cdGNvbnN0IGhfcGFyYW1zID0gT2JqZWN0LmZyb21FbnRyaWVzKG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpKS5lbnRyaWVzKCkpO1xuXG5cdGlmKGhfcGFyYW1zWydhdXRvc2tpcCddKSB7XG5cdFx0Y29uc29sZS5sb2coJ0F1dG9za2lwcGluZyByZWdpc3RyYXRpb24nKTtcblxuXHRcdChhc3luYygpID0+IHtcblx0XHRcdGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuXHRcdFx0YXdhaXQgcmVnaXN0ZXIoJyAgICAgJyk7XG5cdFx0XHRhd2FpdCBsb2dpbignICAgICAnKTtcblx0XHRcdHZvaWQgcmVsb2FkKCk7XG5cdFx0fSkoKTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBzdGFydCBzeXN0ZW1cblx0XHR2b2lkIHJlbG9hZCgpO1xuXHR9XG59XG5lbHNlIHtcblx0Ly8gc3RhcnQgaGVhbHRoIGNoZWNrIHRpbWVyXG5cdGlfaGVhbHRoID0gZ2xvYmFsVGhpcy5zZXRUaW1lb3V0KCgpID0+IHtcblx0XHRkb21sb2coJ0ZhdGFsIHRpbWUgb3V0LCBsaWtlbHkgY2F1c2VkIGJ5IGFuIHVuY2F1Z2h0IGVycm9yLicpO1xuXHR9LCAxNSpYVF9TRUNPTkRTKTtcblxuXHR0cnkge1xuXHRcdC8vIHN0YXJ0IHN5c3RlbVxuXHRcdHZvaWQgcmVsb2FkKCk7XG5cdH1cblx0Y2F0Y2goZV9sb2FkKSB7XG5cdFx0ZGVidWdnZXI7XG5cdFx0Y29uc29sZS5lcnJvcihlX2xvYWQpO1xuXHR9XG59XG4iXSwibmFtZXMiOlsiY3R4Iiwic2VtdmVyLmx0ZSIsIlJlc3RyaWN0ZWRTdmVsdGUiLCJDcmVhdGVXYWxsZXRTdmVsdGUiLCJCbGFua1N2ZWx0ZSIsIlByZVJlZ2lzdGVyU3ZlbHRlIiwiQXV0aGVudGlj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
