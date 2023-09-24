'use client'

import { Tab } from "@headlessui/react";
import { useState } from "react";
import Unconfirmed from "./Unconfirmed";
import Loans from "./Loans";
import ApprovedLoans from "./ApprovedLoans";

export const revalidate = 0;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TabsComponent({ unconfirmed, admin_name, loans, approved }) {
  return (
    <div className='w-full max-w-lg mx-auto py-8'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl bg-purple-900/20 p-1'>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }>
            Unconfirmed
          </Tab>

          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }>
            Loans
          </Tab>

          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }>
            Approved
          </Tab>
        </Tab.List>
        <Tab.Panels className='mt-2'>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2"
            )}>
            <Unconfirmed unconfirmed={unconfirmed} />
          </Tab.Panel>

          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2"
            )}>
            <Loans loans={loans} admin_name={admin_name} />
            {/* Loans */}
          </Tab.Panel>

          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2"
            )}>
            <ApprovedLoans approved={approved} admin_name={admin_name} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
