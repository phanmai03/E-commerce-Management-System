

import React, { Suspense } from "react";
// import { OrderPage } from "./order-form";
import OrderPage from "./order-form";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderPage />
    </Suspense>
  );
}

