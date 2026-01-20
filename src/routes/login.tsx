"use client"

import { createFileRoute } from '@tanstack/react-router'
// import { useState } from 'react';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';


export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  
  // const {login, setLogin} = useState<string>('');
  // const {password, setPassword} = useState<string>('');
  return (
    <>
      {/* <FormField /> */}
      <h2 className="text-3x1 font-bold underline">Login component</h2>
    </>
  );
}
