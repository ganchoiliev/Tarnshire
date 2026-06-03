import { permanentRedirect } from "next/navigation";

// The domestic landing now lives at the apex ("/"). "/home" is collapsed into it
// with a permanent (308) redirect so only one URL serves the landing — no
// duplicate content. The /home/book and /home/deep-clean subroutes are
// separate route segments and are unaffected by this redirect.
export default function ForHomePage() {
  permanentRedirect("/");
}
