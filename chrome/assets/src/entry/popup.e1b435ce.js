import { S as Screen, H as Header, A as AccountEdit, a as StarShellLogo, b as StarShellTitle, c as Horizon, T as ThreadId, d as dm_log, e as System, f as domlog, B as Blank, P as PreRegister, g as Authenticate } from "../../PreRegister.231395ac.js";
import { S as SvelteComponent, i as init, s as safe_not_equal, c as create_component, m as mount_component, t as transition_in, a as transition_out, d as destroy_component, b as component_subscribe, C as CheckboxField, e as binding_callbacks, f as bind, A as ActionsLine, g as space, h as element, j as insert, k as add_flush_callback, l as detach, y as yw_account_ref, n as Secp256k1Key, o as Secrets, p as buffer_to_string8, q as buffer_to_base64, r as set_store_value, u as Accounts, E as Events, v as text, w as attr, x as noop, W as WebResourceCache, P as P_STARSHELL_DECREES, z as SI_VERSION, B as open_external_link, D as qs, V as Vault, F as global_receive, G as initialize_caches, H as yw_navigator, I as ode, J as register, K as login, X as XT_SECONDS, L as F_NOOP } from "../../web-resource-cache.58aa6c5e.js";
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
  const func = () => open_external_link("https://github.com/SolarRepublic/starshell-beta-releases/blob/main/README.md");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuZTFiNDM1Y2UuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvc2NyZWVuL0NyZWF0ZVdhbGxldC5zdmVsdGUiLCIuLi8uLi8uLi8uLi8uLi9zcmMvZXh0ZW5zaW9uL3Jlc3RyaWN0aW9ucy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvc2NyZWVuL1Jlc3RyaWN0ZWQuc3ZlbHRlIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2VudHJ5L3BvcHVwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCB7eXdfYWNjb3VudF9yZWZ9IGZyb20gJyMjL21lbSc7XG5cdGltcG9ydCB0eXBlIHsgQWNjb3VudCwgQWNjb3VudFBhdGggfSBmcm9tICcjL21ldGEvYWNjb3VudCc7XG5cdGltcG9ydCB0eXBlIHsgUGZwLCBQZnBQYXRoIH0gZnJvbSAnIy9tZXRhL3BmcCc7XG5cdGltcG9ydCB0eXBlIHsgUmVzb3VyY2UgfSBmcm9tICcjL21ldGEvcmVzb3VyY2UnO1xuXHRpbXBvcnQgeyBBY2NvdW50cyB9IGZyb20gJyMvc3RvcmUvYWNjb3VudHMnO1xuXHRpbXBvcnQgeyBTZWNyZXRzIH0gZnJvbSAnIy9zdG9yZS9zZWNyZXRzJztcblx0aW1wb3J0IHsgb2RlIH0gZnJvbSAnIy91dGlsL2JlbHQnO1xuXHRpbXBvcnQgeyBidWZmZXJfdG9fYmFzZTY0LCBidWZmZXJfdG9fc3RyaW5nOCB9IGZyb20gJyMvdXRpbC9kYXRhJztcblx0aW1wb3J0IEFjdGlvbnNMaW5lIGZyb20gJy4uL3VpL0FjdGlvbnNMaW5lLnN2ZWx0ZSc7XG5cdGltcG9ydCBDaGVja2JveEZpZWxkIGZyb20gJy4uL3VpL0NoZWNrYm94RmllbGQuc3ZlbHRlJztcblx0aW1wb3J0IHsgSGVhZGVyLCBTY3JlZW4gfSBmcm9tICcuL19zY3JlZW5zJztcblxuXHRpbXBvcnQgeyBTZWNwMjU2azFLZXkgfSBmcm9tICcjL2NyeXB0by9zZWNwMjU2azEnO1xuXHRpbXBvcnQgdHlwZSB7IFNlY3JldCwgU2VjcmV0UGF0aCB9IGZyb20gJyMvbWV0YS9zZWNyZXQnO1xuXHRpbXBvcnQgQWNjb3VudEVkaXQgZnJvbSAnLi9BY2NvdW50RWRpdC5zdmVsdGUnO1xuXHRpbXBvcnQgeyBFdmVudHMgfSBmcm9tICcjL3N0b3JlL2V2ZW50cyc7XG5cblxuXHRleHBvcnQgbGV0IHJlc2V0ID0gZmFsc2U7XG5cblx0ZXhwb3J0IGxldCBiX2FncmVlZCA9IGZhbHNlO1xuXG5cdGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZV9hY2NvdW50KHBfc2VjcmV0OiBTZWNyZXRQYXRoLCBzYV9vd25lcjogc3RyaW5nLCBwX3BmcDogUGZwUGF0aCk6IFByb21pc2U8QWNjb3VudFBhdGg+IHtcblx0XHQvLyBvcGVuIGFjY291bnRzIHN0b3JlIGFuZCBzYXZlIG5ldyBhY2NvdW50XG5cdFx0Y29uc3QgcF9hY2NvdW50ID0gYXdhaXQgQWNjb3VudHMub3Blbihrc19hY2NvdW50cyA9PiBrc19hY2NvdW50cy5wdXQoe1xuXHRcdFx0ZmFtaWx5OiAnY29zbW9zJyxcblx0XHRcdHB1YmtleTogc2Ffb3duZXIsXG5cdFx0XHRzZWNyZXQ6IHBfc2VjcmV0LFxuXHRcdFx0bmFtZTogJ0NpdGl6ZW4gMScsXG5cdFx0XHRwZnA6IHBfcGZwLFxuXHRcdH0pKTtcblxuXHRcdC8vIGNyZWF0ZSBldmVudFxuXHRcdGF3YWl0IEV2ZW50cy5pbnNlcnQoe1xuXHRcdFx0dHlwZTogJ2FjY291bnRfY3JlYXRlZCcsXG5cdFx0XHR0aW1lOiBEYXRlLm5vdygpLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRhY2NvdW50OiBwX2FjY291bnQsXG5cdFx0XHR9LFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHBfYWNjb3VudDtcblx0fVxuXG5cdGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZV9wcml2YXRlX2tleSgpIHtcblx0XHQvLyBnZW5lcmF0ZSBuZXcgcHJpdmF0ZSBrZXlcblx0XHRjb25zdCBba2tfc2ssIGtfc2VjcF0gPSBhd2FpdCBTZWNwMjU2azFLZXkuZ2VuZXJhdGVQcml2YXRlS2V5KHRydWUpO1xuXG5cdFx0Ly8gZ2VuZXJhdGUgbmV3IHV1aWQgZm9yIHRoZSBzZWNyZXRcblx0XHRjb25zdCBzX3V1aWQgPSBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuXG5cdFx0Ly8gc2F2ZSBwcml2YXRlIGtleSB0byBzZWNyZXRzIHN0b3JlXG5cdFx0Y29uc3QgcF9zZWNyZXQgPSBhd2FpdCBTZWNyZXRzLm9wZW4oYXN5bmMga3MgPT4ga3MucHV0KHtcblx0XHRcdHR5cGU6ICdwcml2YXRlX2tleScsXG5cdFx0XHRkYXRhOiBhd2FpdCBra19zay5hY2Nlc3MoYXR1OF9zayA9PiBidWZmZXJfdG9fc3RyaW5nOChhdHU4X3NrKSksXG5cdFx0XHRuYW1lOiAnQXV0by1nZW5lcmF0ZWQgcHJpdmF0ZSBrZXkgZm9yIGJldGEnLFxuXHRcdFx0dXVpZDogc191dWlkLFxuXHRcdFx0c2VjdXJpdHk6IHtcblx0XHRcdFx0dHlwZTogJ25vbmUnLFxuXHRcdFx0fSxcblx0XHR9KSk7XG5cblx0XHQvLyBleHBvcnQgcHVibGljIGtleVxuXHRcdGNvbnN0IGF0dThfcGsgPSBrX3NlY3AuZXhwb3J0UHVibGljS2V5KCk7XG5cblx0XHQvLyBcblx0XHRjb25zdCBwX2FjY291bnQgPSBhd2FpdCBjcmVhdGVfYWNjb3VudChwX3NlY3JldCwgYnVmZmVyX3RvX2Jhc2U2NChhdHU4X3BrKSwgJycpO1xuXG5cdFx0Ly8gc2V0IGFjY291bnRcblx0XHQkeXdfYWNjb3VudF9yZWYgPSBwX2FjY291bnQ7XG5cdH1cblx0Ly8gYXN5bmMgZnVuY3Rpb24gY3JlYXRlX3NlZWQoKSB7XG5cdC8vIFx0Ly8gY3JlYXRlIG5ldyBtbmVtb25pY1xuXHQvLyBcdGNvbnN0IGtuX3BhZGRlZCA9IGF3YWl0IGJpcDM5RW50cm9weVRvUGFkZGVkTW5lbW9uaWMoU2Vuc2l0aXZlQnl0ZXMucmFuZG9tKDMyKSk7XG5cblx0Ly8gXHQvLyBzYXZlIHBhZGRlZCBtbmVtb25pYyB0byBzZWNyZXRzIHN0b3JlXG5cdC8vIFx0YXdhaXQgU2VjcmV0cy5vcGVuKGtzID0+IGtzLmFkZCh7XG5cdC8vIFx0XHR0eXBlOiAnbW5lbW9uaWMnLFxuXHQvLyBcdFx0ZGF0YTogYnVmZmVyX3RvX3N0cmluZzgoa25fcGFkZGVkLmRhdGEpLFxuXHQvLyBcdFx0aGludDogJycsXG5cdC8vIFx0XHRuYW1lOiAnTW5lbW9uaWMgS2V5IGZvciBCZXRhJyxcblx0Ly8gXHRcdHV1aWQ6IGNyeXB0by5yYW5kb21VVUlEKCksXG5cdC8vIFx0XHRzZWN1cml0eToge1xuXHQvLyBcdFx0XHR0eXBlOiAnbm9uZScsXG5cdC8vIFx0XHR9LFxuXHQvLyBcdH0pKTtcblxuXHQvLyBcdC8vIHRyaW0gcGFkZGVkIG1uZW1vbmljXG5cdC8vIFx0Y29uc3Qga25fdHJpbW1lZCA9IHRyaW1QYWRkZWRNbmVtb25pYyhrbl9wYWRkZWQpO1xuXG5cdC8vIFx0Ly8gZ2VuZXJhdGUgc2VlZFxuXHQvLyBcdGNvbnN0IGtrX3NlZWQgPSBhd2FpdCBiaXAzOU1uZW1vbmljVG9TZWVkKCgpID0+IGtuX3RyaW1tZWQuZGF0YSwgKCkgPT4gVWludDhBcnJheS5mcm9tKFtdKSk7XG5cblxuXHQvLyBcdC8vIGRlcml2ZSBhY2NvdW50XG5cdC8vIFx0Y29uc3QgeV9iaXAzMiA9IEJJUDMyRmFjdG9yeShlY2MpO1xuXHQvLyBcdGF3YWl0IGtrX3NlZWQuYWNjZXNzKChhdHU4X3NlZWQpID0+IHtcblx0Ly8gXHRcdGNvbnN0IHlfbWFzdGVyID0geV9iaXAzMi5mcm9tU2VlZChhdHU4X3NlZWQgYXMgQnVmZmVyKTtcblx0Ly8gXHRcdGNvbnN0IHN4X2JpcDQ0OiBCaXA0NFBhdGggPSBgbS80NCcvNTI5Jy8wJy8wLzBgO1xuXHQvLyBcdFx0eV9tYXN0ZXIuZGVyaXZlUGF0aChzeF9iaXA0NCkucHJpdmF0ZUtleTtcblx0Ly8gXHR9KTtcblxuXHQvLyBcdC8vIGNyZWF0ZSBhY2NvdW50IHVzaW5nIG5ldyBzZWVkXG5cdC8vIFx0YXdhaXQgY3JlYXRlX2FjY291bnQoKTtcblx0Ly8gfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwibGVzc1wiPlxuXHQuaWNvbiB7XG5cdFx0cGFkZGluZy10b3A6IDI1JTtcblx0fVxuPC9zdHlsZT5cblxuPFNjcmVlbj5cblx0PEhlYWRlclxuXHRcdHRpdGxlPVwiQ3JlYXRlIGEgbmV3IHdhbGxldFwiXG5cdC8+XG5cblx0PHA+XG5cdFx0VGhpcyBzb2Z0d2FyZSBpcyBjdXJyZW50bHkgaW4gYmV0YS4gU2luY2UgaXQgaGFzIG5vdCB1bmRlcmdvbmUgc2VjdXJpdHkgYXVkaXRzLCBpbXBvcnRpbmcgYW5kIGV4cG9ydGluZyBvZiBtbmVtb25pY3MgYW5kIHByaXZhdGUga2V5cyBpcyBmb3JiaWRkZW4uXG5cdDwvcD5cblxuXHQ8cD5cblx0XHRUaGlzIG1lYW5zIHlvdSB3aWxsIG5vdCBiZSBhYmxlIHRvIGJhY2t1cCBzZWVkIHBocmFzZXMsIHByaXZhdGUga2V5cywgb3IgdXNlIGhhcmR3YXJlIHdhbGxldHMuXG5cdDwvcD5cblxuXHQ8cD5cblx0XHRBbGwgdHJhbnNhY3Rpb25zIHRha2UgcGxhY2Ugb24gYSB0ZXN0IG5ldHdvcmsuXG5cdDwvcD5cblxuXHQ8Q2hlY2tib3hGaWVsZCBpZD1cIlwiIGJpbmQ6Y2hlY2tlZD17Yl9hZ3JlZWR9PlxuXHRcdEJ5IGNoZWNraW5nIHRoaXMgYm94LCB5b3UgYWdyZWUgdG8gdGhlIDxhIGhyZWY9XCJodHRwczovL3N0YXJzaGVsbC5uZXQvdGFjLmh0bWxcIj5UZXJtcyBhbmQgQ29uZGl0aW9uczwvYT4uXG5cdDwvQ2hlY2tib3hGaWVsZD5cblxuXHQ8QWN0aW9uc0xpbmUgY29uZmlybT17WydDcmVhdGUgbmV3IFN0YXJTaGVsbCB3YWxsZXQnLCBjcmVhdGVfcHJpdmF0ZV9rZXksICFiX2FncmVlZF19IGNvbnRkPXt7XG5cdFx0Y3JlYXRvcjogQWNjb3VudEVkaXQsXG5cdFx0cHJvcHM6IHtcblx0XHRcdGFjY291bnQ6ICR5d19hY2NvdW50X3JlZixcblx0XHR9LFxuXHR9fSAvPlxuXG48L1NjcmVlbj4iLCJpbXBvcnQge1BfU1RBUlNIRUxMX0RFQ1JFRVMsIFNJX1ZFUlNJT059IGZyb20gJyMvc2hhcmUvY29uc3RhbnRzJztcbmltcG9ydCB7RGVjcmVlLCBXZWJSZXNvdXJjZUNhY2hlfSBmcm9tICcjL3N0b3JlL3dlYi1yZXNvdXJjZS1jYWNoZSc7XG5cbmltcG9ydCAqIGFzIHNlbXZlciBmcm9tICdzZW12ZXInO1xuXG5jb25zdCBSX1NFTVZFUiA9IC9eKFs8Pl09Pyk/KC4rKSQvO1xuXG5mdW5jdGlvbiBzYXRpc2ZpZXMoc2lfdmVyc2lvbjogc3RyaW5nLCBzX3NlbXZlcjogc3RyaW5nKTogYm9vbGVhbiB7XG5cdGNvbnN0IFssIHNfY21wLCBzX2Jhc2VdID0gUl9TRU1WRVIuZXhlYyhzX3NlbXZlcikhO1xuXHRpZignPD0nID09PSBzX2NtcCkge1xuXHRcdHJldHVybiBzZW12ZXIubHRlKHNpX3ZlcnNpb24sIHNfYmFzZSk7XG5cdH1cblxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja19yZXN0cmljdGlvbnMoKTogUHJvbWlzZTxEZWNyZWVbXT4ge1xuXHRjb25zdCBhX3Jlc3RyaWN0aW9uczogRGVjcmVlW10gPSBbXTtcblxuXHRjb25zdCBhX2RlY3JlZXMgPSBhd2FpdCBXZWJSZXNvdXJjZUNhY2hlLmdldChQX1NUQVJTSEVMTF9ERUNSRUVTKSBhcyBEZWNyZWVbXTtcblxuXHQvLyBlYWNoIGRlY3JlZVxuXHRmb3IoY29uc3QgZ19kZWNyZWUgb2YgYV9kZWNyZWVzIHx8IFtdKSB7XG5cdFx0Ly8gYWZmZWN0cyB0aGlzIHZlcnNpb25cblx0XHRpZihzYXRpc2ZpZXMoU0lfVkVSU0lPTiwgZ19kZWNyZWUuYWZmZWN0cykpIHtcblx0XHRcdC8vIGRlcGVuZGluZyBvbiBhY3Rpb25cblx0XHRcdHN3aXRjaChnX2RlY3JlZS5hY3Rpb24pIHtcblx0XHRcdFx0Ly8gcmVzdHJpY3QgdXNhZ2Vcblx0XHRcdFx0Y2FzZSAncmVzdHJpY3QnOiB7XG5cdFx0XHRcdFx0YV9yZXN0cmljdGlvbnMucHVzaChnX2RlY3JlZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0Ly8gaWdub3JlXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYV9yZXN0cmljdGlvbnM7XG59XG4iLCI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgeyBTY3JlZW4gfSBmcm9tICcuL19zY3JlZW5zJztcblxuXHRpbXBvcnQgQWN0aW9uc0xpbmUgZnJvbSAnLi4vdWkvQWN0aW9uc0xpbmUuc3ZlbHRlJztcblx0aW1wb3J0IFN0YXJTaGVsbExvZ28gZnJvbSAnLi4vdWkvU3RhclNoZWxsTG9nby5zdmVsdGUnO1xuXHRpbXBvcnQgU3RhclNoZWxsVGl0bGUgZnJvbSAnLi4vdWkvU3RhclNoZWxsVGl0bGUuc3ZlbHRlJztcblx0aW1wb3J0IEhvcml6b24gZnJvbSAnLi4vdWkvSG9yaXpvbi5zdmVsdGUnO1xuXHRpbXBvcnQgeyBvcGVuX2V4dGVybmFsX2xpbmsgfSBmcm9tICcjL3V0aWwvZG9tJztcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cImxlc3NcIj5cblx0QGltcG9ydCAnLi4vLi4vc3R5bGUvdXRpbC5sZXNzJztcblxuXHQ6Z2xvYmFsKC5yZXN0cmljdGVkKSB7XG5cdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0Z2FwOiAyMHB4O1xuXHRcdHBhZGRpbmctbGVmdDogMTZweDtcblx0XHRwYWRkaW5nLXJpZ2h0OiAxNnB4O1xuXHRcdGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG5cdFx0YmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIHRvcDtcblx0XHRiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuXG5cdFx0cGFkZGluZy10b3A6IGNhbGMoNTB2aCAtIDE1MHB4KTtcblx0fVxuPC9zdHlsZT5cblxuPFNjcmVlbiByb290IGNsYXNzTmFtZXM9J3Jlc3RyaWN0ZWQnPlxuXHQ8U3RhclNoZWxsTG9nbyBkaW09ezk2fSAvPlxuXG5cdDxTdGFyU2hlbGxUaXRsZSAvPlxuXG5cdDxIb3Jpem9uIC8+XG5cblx0PGRpdiBjbGFzcz1cImxhcmdlXCI+XG5cdFx0PGRpdj5QbGVhc2UgdXBkYXRlIHRvIGNvbnRpbnVlIGJldGEgdGVzdGluZy48L2Rpdj5cblx0XHQ8ZGl2PkEgbmV3IHZlcnNpb24gaGFzIGJlZW4gcmVsZWFzZWQuPC9kaXY+XG5cdDwvZGl2PlxuXG5cdDxwPlxuXHRcdFxuXHQ8L3A+XG5cblx0PEFjdGlvbnNMaW5lIGNvbmZpcm09e1snU2VlIEluc3RydWN0aW9ucycsICgpID0+IG9wZW5fZXh0ZXJuYWxfbGluaygnaHR0cHM6Ly9naXRodWIuY29tL1NvbGFyUmVwdWJsaWMvc3RhcnNoZWxsLWJldGEtcmVsZWFzZXMvYmxvYi9tYWluL1JFQURNRS5tZCcpXX0gLz5cbjwvU2NyZWVuPlxuIiwiaW1wb3J0IFN5c3RlbVN2ZWx0ZSBmcm9tICcjL2FwcC9jb250YWluZXIvU3lzdGVtLnN2ZWx0ZSc7XG5pbXBvcnQgQmxhbmtTdmVsdGUgZnJvbSAnIy9hcHAvc2NyZWVuL0JsYW5rLnN2ZWx0ZSc7XG5pbXBvcnQgQXV0aGVudGljYXRlU3ZlbHRlIGZyb20gJyMvYXBwL3NjcmVlbi9BdXRoZW50aWNhdGUuc3ZlbHRlJztcblxuXG5pbXBvcnQgdHlwZSB7IFN2ZWx0ZUNvbXBvbmVudCB9IGZyb20gJ3N2ZWx0ZSc7XG5pbXBvcnQgdHlwZSB7IFBhZ2VDb25maWcgfSBmcm9tICcjL2FwcC9uYXYvcGFnZSc7XG5pbXBvcnQgeyBWYXVsdCB9IGZyb20gJyMvY3J5cHRvL3ZhdWx0JztcbmltcG9ydCB7IHFzIH0gZnJvbSAnIy91dGlsL2RvbSc7XG5pbXBvcnQgeyBpbml0aWFsaXplX2NhY2hlcywgeXdfbmF2aWdhdG9yIH0gZnJvbSAnIy9hcHAvbWVtJztcbmltcG9ydCB7IFRocmVhZElkIH0gZnJvbSAnIy9hcHAvZGVmJztcbmltcG9ydCB7IEZfTk9PUCwgb2RlIH0gZnJvbSAnIy91dGlsL2JlbHQnO1xuaW1wb3J0IHsgZG1fbG9nLCBkb21sb2cgfSBmcm9tICcuL2ZhbGxiYWNrJztcbmltcG9ydCBQcmVSZWdpc3RlclN2ZWx0ZSBmcm9tICcjL2FwcC9zY3JlZW4vUHJlUmVnaXN0ZXIuc3ZlbHRlJztcbmltcG9ydCB7IGdsb2JhbF9yZWNlaXZlIH0gZnJvbSAnIy9zY3JpcHQvbXNnLWdsb2JhbCc7XG5pbXBvcnQgeyBBY2NvdW50cyB9IGZyb20gJyMvc3RvcmUvYWNjb3VudHMnO1xuaW1wb3J0IENyZWF0ZVdhbGxldFN2ZWx0ZSBmcm9tICcjL2FwcC9zY3JlZW4vQ3JlYXRlV2FsbGV0LnN2ZWx0ZSc7XG5pbXBvcnQgeyBsb2dpbiwgcmVnaXN0ZXIgfSBmcm9tICcjL3NoYXJlL2F1dGgnO1xuaW1wb3J0IHsgWFRfU0VDT05EUyB9IGZyb20gJyMvc2hhcmUvY29uc3RhbnRzJztcbmltcG9ydCB7IGNoZWNrX3Jlc3RyaWN0aW9ucyB9IGZyb20gJyMvZXh0ZW5zaW9uL3Jlc3RyaWN0aW9ucyc7XG5pbXBvcnQgUmVzdHJpY3RlZFN2ZWx0ZSBmcm9tICcjL2FwcC9zY3JlZW4vUmVzdHJpY3RlZC5zdmVsdGUnO1xuaW1wb3J0IHsgV2ViUmVzb3VyY2VDYWNoZSB9IGZyb20gJyMvc3RvcmUvd2ViLXJlc291cmNlLWNhY2hlJztcblxuLy8gYmluZCBmYWN0b3J5IHJlc2V0IGJ1dHRvblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhY3RvcnktcmVzZXQnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYygpID0+IHtcblx0YXdhaXQgY2hyb21lLnN0b3JhZ2Uuc2Vzc2lvbi5jbGVhcigpO1xuXHRhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5jbGVhcigpO1xuXHRhd2FpdCByZWxvYWQoKTtcbn0pO1xuXG4vLyB0b3AtbGV2ZWwgc3lzdGVtIGNvbXBvbmVudFxubGV0IHljX3N5c3RlbTogU3ZlbHRlQ29tcG9uZW50IHwgbnVsbCA9IG51bGw7XG5cbi8vIGhlYWx0aCBjaGVjayB0aW1lclxubGV0IGlfaGVhbHRoID0gMDtcblxuLy8gYnVzeSByZWxvYWRpbmdcbmxldCBiX2J1c3kgPSBmYWxzZTtcblxuLy8gcmVsb2FkIHRoZSBlbnRpcmUgc3lzdGVtXG5hc3luYyBmdW5jdGlvbiByZWxvYWQoKSB7XG5cdGlmKGJfYnVzeSkgcmV0dXJuO1xuXG5cdGJfYnVzeSA9IHRydWU7XG5cblx0Ly8gZGVzdHJveSBwcmV2aW91cyBzeXN0ZW1cblx0aWYoeWNfc3lzdGVtKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHljX3N5c3RlbS4kZGVzdHJveSgpO1xuXHRcdH1cblx0XHRjYXRjaChlX2Rlc3Ryb3kpIHt9XG5cdH1cblxuXHQvLyByZW1vdmUgc3RhbGUgZG9tXG5cdHRyeSB7XG5cdFx0cXMoZG9jdW1lbnQuYm9keSwgJ21haW4nKT8ucmVtb3ZlKCk7XG5cdH1cblx0Y2F0Y2goZV9yZW1vdmUpIHt9XG5cblx0Ly8gbGF1bmNoIGFwcFxuXHRsZXQgYl9sYXVuY2ggPSBmYWxzZTtcblxuXHQvLyBzdGFydCBwYWdlXG5cdGxldCBnY19wYWdlX3N0YXJ0OiBQYWdlQ29uZmlnO1xuXG5cdC8vIGNvbnRleHRcblx0bGV0IGhfY29udGV4dCA9IHt9O1xuXG5cdC8vIGNoZWNrIGlmIHJvb3Qga2V5IGlzIGFjY2Vzc2libGVcblx0Y29uc3QgZGtfcm9vdCA9IGF3YWl0IFZhdWx0LmdldFJvb3RLZXkoKTtcblxuXHQvLyByZXN0cmljdGlvbnNcblx0Y29uc3QgYV9yZXN0cmljdGlvbnMgPSBhd2FpdCBjaGVja19yZXN0cmljdGlvbnMoKTtcblx0aWYoYV9yZXN0cmljdGlvbnMubGVuZ3RoKSB7XG5cdFx0Z2NfcGFnZV9zdGFydCA9IHtcblx0XHRcdGNyZWF0b3I6IFJlc3RyaWN0ZWRTdmVsdGUsXG5cdFx0fTtcblx0fVxuXHQvLyB2YXVsdCBpcyB1bmxvY2tlZFxuXHRlbHNlIGlmKGRrX3Jvb3QpIHtcblx0XHQvLyByZWdpc3RlciBmb3IgZ2xvYmFsIGV2ZW50c1xuXHRcdGNvbnN0IGZfdW5yZWdpc3RlciA9IGdsb2JhbF9yZWNlaXZlKHtcblx0XHRcdC8vIHN5c3RlbSByZWNlaXZlZCBsb2dvdXQgY29tbWFuZFxuXHRcdFx0bG9nb3V0KCkge1xuXHRcdFx0XHQvLyB1bnJlZ2lzdGVyIHRoaXMgbGlzdGVuZXJcblx0XHRcdFx0Zl91bnJlZ2lzdGVyKCk7XG5cblx0XHRcdFx0Ly8gcmVsb2FkIHN5c3RlbVxuXHRcdFx0XHR2b2lkIHJlbG9hZCgpO1xuXHRcdFx0fSxcblx0XHR9KTtcblxuXHRcdC8vIGxvYWQgY2FjaGVzXG5cdFx0YXdhaXQgaW5pdGlhbGl6ZV9jYWNoZXMoKTtcblxuXHRcdC8vIGNoZWNrIGZvciBhY2NvdW50KHMpXG5cdFx0Y29uc3Qga3NfYWNjb3VudHMgPSBhd2FpdCBBY2NvdW50cy5yZWFkKCk7XG5cblx0XHQvLyBubyBhY2NvdW50czsgbG9hZCBhY2NvdW50IGNyZWF0aW9uXG5cdFx0aWYoIU9iamVjdC5rZXlzKGtzX2FjY291bnRzLnJhdykubGVuZ3RoKSB7XG5cdFx0XHRnY19wYWdlX3N0YXJ0ID0ge1xuXHRcdFx0XHRjcmVhdG9yOiBDcmVhdGVXYWxsZXRTdmVsdGUsXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBzZXQgY29tcGxldGUgZnVuY3Rpb24gaW4gY29udGV4dFxuXHRcdFx0aF9jb250ZXh0ID0ge1xuXHRcdFx0XHRjb21wbGV0ZWQ6IHJlbG9hZCxcblx0XHRcdFx0Ly8gY29tcGxldGVkOiBGX05PT1AsXG5cdFx0XHR9O1xuXHRcdH1cblx0XHQvLyBhY2NvdW50IGV4aXN0czsgbG9hZCBkZWZhdWx0IGhvbWVzY3JlZW5cblx0XHRlbHNlIHtcblx0XHRcdGdjX3BhZ2Vfc3RhcnQgPSB7XG5cdFx0XHRcdGNyZWF0b3I6IEJsYW5rU3ZlbHRlLFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gbGF1bmNoIGhvbWVzY3JlZW5cblx0XHRcdGJfbGF1bmNoID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0Ly8gdmF1bHQgaXMgbG9ja2VkXG5cdGVsc2Uge1xuXHRcdC8vIHJlZ2lzdGVyIGZvciBnbG9iYWwgZXZlbnRzXG5cdFx0Y29uc3QgZl91bnJlZ2lzdGVyID0gZ2xvYmFsX3JlY2VpdmUoe1xuXHRcdFx0Ly8gc3lzdGVtIHJlY2VpdmVkIGxvZ2luIGNvbW1hbmRcblx0XHRcdGxvZ2luKCkge1xuXHRcdFx0XHQvLyB1bnJlZ2lzdGVyIHRoaXMgbGlzdGVuZXJcblx0XHRcdFx0Zl91bnJlZ2lzdGVyKCk7XG5cblx0XHRcdFx0Ly8gcmVsb2FkIHN5c3RlbVxuXHRcdFx0XHR2b2lkIHJlbG9hZCgpO1xuXHRcdFx0fSxcblx0XHR9KTtcblxuXHRcdC8vIHJldHJpZXZlIHJvb3Rcblx0XHRjb25zdCBnX3Jvb3QgPSBhd2FpdCBWYXVsdC5nZXRCYXNlKCk7XG5cblx0XHQvLyBubyByb290IHNldCwgbmVlZCB0byByZWdpc3RlclxuXHRcdGlmKCFnX3Jvb3QpIHtcblx0XHRcdGdjX3BhZ2Vfc3RhcnQgPSB7XG5cdFx0XHRcdGNyZWF0b3I6IFByZVJlZ2lzdGVyU3ZlbHRlLFxuXHRcdFx0fTtcblx0XHR9XG5cdFx0Ly8gcm9vdCBpcyBzZXQsIG5lZWQgdG8gYXV0aGVudGljYXRlXG5cdFx0ZWxzZSB7XG5cdFx0XHRnY19wYWdlX3N0YXJ0ID0ge1xuXHRcdFx0XHRjcmVhdG9yOiBBdXRoZW50aWNhdGVTdmVsdGUsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIGluIGVpdGhlciBjYXNlLCBzZXQgY29tcGxldGUgZnVuY3Rpb24gaW4gY29udGV4dFxuXHRcdGhfY29udGV4dCA9IHtcblx0XHRcdC8vIGNvbXBsZXRlZDogcmVsb2FkLFxuXHRcdFx0Y29tcGxldGVkOiBGX05PT1AsXG5cdFx0fTtcblx0fVxuXG5cdC8vIHdhaXQgZm9yIG5hdmlnYXRvciB0byBiZSBpbml0aWFsaXplZFxuXHRsZXQgYl9pbml0aWFsaXplZCA9IGZhbHNlO1xuXHRjb25zdCBmX3Vuc3Vic2NyaWJlID0geXdfbmF2aWdhdG9yLnN1YnNjcmliZSgoa19uYXZpZ2F0b3IpID0+IHtcblx0XHQvLyBydW5uZXIgZ2V0cyBjYWxsZWQgaW1tZWRpYXRlbHksIGJ1dCBzeXN0ZW0gaGFzIG5vdCB1cGRhdGVkIG5hdmlnYXRvciB5ZXRcblx0XHRpZighYl9pbml0aWFsaXplZCkge1xuXHRcdFx0Yl9pbml0aWFsaXplZCA9IHRydWU7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gc3lzdGVtIHVwZGF0ZWQgbmF2aWdhdG9yXG5cdFx0aWYoa19uYXZpZ2F0b3IpIHtcblx0XHRcdC8vIHVuc3Vic2NyaWJlIGZyb20gcmVhY3RpdmUgdXBkYXRlc1xuXHRcdFx0Zl91bnN1YnNjcmliZSgpO1xuXG5cdFx0XHQvLyBsYXVuY2ggdG8gaG9tZXNjcmVlblxuXHRcdFx0aWYoYl9sYXVuY2gpIHtcblx0XHRcdFx0a19uYXZpZ2F0b3IuYWN0aXZhdGVUaHJlYWQoVGhyZWFkSWQuVE9LRU5TKTtcblx0XHRcdH1cblx0XHRcdC8vIGxhdW5jaCB0byBpbml0IHRocmVhZFxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGtfbmF2aWdhdG9yLmFjdGl2YXRlVGhyZWFkKFRocmVhZElkLklOSVQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBhdHRlbXB0IHRvIGhpZGUgbG9nXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRkbV9sb2chLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaChlX2hpZGUpIHt9XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBjcmVhdGUgc3lzdGVtIGNvbXBvbmVudFxuXHR5Y19zeXN0ZW0gPSBuZXcgU3lzdGVtU3ZlbHRlKHtcblx0XHR0YXJnZXQ6IGRvY3VtZW50LmJvZHksXG5cdFx0cHJvcHM6IHtcblx0XHRcdG1vZGU6ICdhcHAnLFxuXHRcdFx0cGFnZTogZ2NfcGFnZV9zdGFydCxcblx0XHR9LFxuXHRcdGNvbnRleHQ6IG5ldyBNYXAob2RlKGhfY29udGV4dCkpLFxuXHR9KTtcblxuXHQvLyBjbGVhciBoZWFsdGggY2hlY2tcblx0Y2xlYXJUaW1lb3V0KGlfaGVhbHRoKTtcblxuXHRiX2J1c3kgPSBmYWxzZTtcbn1cblxuXG4vLyBkZXZcbmlmKCdsb2NhbGhvc3QnID09PSBsb2NhdGlvbi5ob3N0bmFtZSkge1xuXHRjb25zdCBoX3BhcmFtcyA9IE9iamVjdC5mcm9tRW50cmllcyhuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKSkuZW50cmllcygpKTtcblxuXHRpZihoX3BhcmFtc1snYXV0b3NraXAnXSkge1xuXHRcdGNvbnNvbGUubG9nKCdBdXRvc2tpcHBpbmcgcmVnaXN0cmF0aW9uJyk7XG5cblx0XHQoYXN5bmMoKSA9PiB7XG5cdFx0XHRsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcblx0XHRcdGF3YWl0IHJlZ2lzdGVyKCcgICAgICcpO1xuXHRcdFx0YXdhaXQgbG9naW4oJyAgICAgJyk7XG5cdFx0XHR2b2lkIHJlbG9hZCgpO1xuXHRcdH0pKCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gc3RhcnQgc3lzdGVtXG5cdFx0dm9pZCByZWxvYWQoKTtcblx0fVxufVxuZWxzZSB7XG5cdC8vIHN0YXJ0IGhlYWx0aCBjaGVjayB0aW1lclxuXHRpX2hlYWx0aCA9IGdsb2JhbFRoaXMuc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0ZG9tbG9nKCdGYXRhbCB0aW1lIG91dCwgbGlrZWx5IGNhdXNlZCBieSBhbiB1bmNhdWdodCBlcnJvci4nKTtcblx0fSwgMTUqWFRfU0VDT05EUyk7XG5cblx0dHJ5IHtcblx0XHQvLyBzdGFydCBzeXN0ZW1cblx0XHR2b2lkIHJlbG9hZCgpO1xuXHR9XG5cdGNhdGNoKGVfbG9hZCkge1xuXHRcdGRlYnVnZ2VyO1xuXHRcdGNvbnNvbGUuZXJyb3IoZV9sb2FkKTtcblx0fVxufVxuIl0sIm5hbWVzIjpbImN0eCIsInNlbXZlci5sdGUiLCJSZXN0cmljdGVkU3ZlbHRlIiwiQ3JlYXRlV2FsbGV0U3ZlbHRlIiwiQmxhbmtTdmVsdGUiLCJQcmVSZWdpc3Rl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
