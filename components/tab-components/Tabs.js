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
        <Tab.List className='flex space-x-1 rounded-xl bg-[#fcf0e9] p-1'>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#D76F30]",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-[#D76F30] focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : " hover:bg-white/[0.12] hover:text-gray-500"
              )
            }>
            Unconfirmed
          </Tab>

          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 ",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-800 focus:outline-none focus:ring-2",
                selected
                  ? "text-purple-800 bg-white shadow"
                  : "text-[#D76F30] hover:bg-white/[0.12] hover:text-gray-500"
              )
            }>
            Loans
          </Tab>

          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 ",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-green-800 focus:outline-none focus:ring-2",
                selected
                  ? "text-green-800 bg-white shadow"
                  : "text-[#D76F30] hover:bg-white/[0.12] hover:text-gray-500"
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
