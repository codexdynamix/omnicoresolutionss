import { t as cn } from "./site-NmzgmCl5.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-Dzoi6vCo.js
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-xl bg-card px-3.5 text-sm text-foreground shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-[box-shadow] duration-150 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-background),0_0_0_4px_var(--color-ring)] disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
//#endregion
export { Input as t };
