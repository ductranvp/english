import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
import router from "./index"; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  /* Start progress bar */
  NProgress.start();

  /* Set page title */
  document.title = to.meta.title;

  /* If no route matched => not found */
  if (!to.matched.length) {
    next({ name: "notFoundPage" });
  }

  next();
});

router.afterEach(() => {
  // finish progress bar
  setTimeout(() => {
    NProgress.done();
  }, 200);
});
