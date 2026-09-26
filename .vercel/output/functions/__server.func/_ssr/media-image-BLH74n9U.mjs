import { t as cn } from "./site-NmzgmCl5.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-image-BLH74n9U.js
var import_jsx_runtime = require_jsx_runtime();
function MediaImage({ className, framed = true, alt, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		alt: alt ?? "",
		referrerPolicy: "no-referrer",
		className: cn("h-full w-full object-cover", framed && "outline outline-1 -outline-offset-1 outline-foreground/10", className),
		...props
	});
}
//#endregion
export { MediaImage as t };
