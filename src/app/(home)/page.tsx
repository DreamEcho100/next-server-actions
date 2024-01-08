'use client';
import ReactQuerySafeActionExample from './_components/ReactQuerySafeActionExample';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactExample from './_components/react';

export default function Home() {
	return (
		<main>
			<h1 className='text-center text-3xl font-bold text-indigo-600'>
				Hello World
			</h1>
			<ReactQuerySafeActionExample />
			<ReactExample />
			<ToastContainer />
		</main>
	);
}
