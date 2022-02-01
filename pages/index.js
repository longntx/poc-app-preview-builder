import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/Home'));

export default function Index() {
  const components = [
    { name: 'HomeButton', props: { title: 'Home button Component' } },
    { name: 'Rally', props: { title: 'Rally Component' } },
    { name: 'Sales', props: { title: 'Sales Component' } },
    { name: 'Food', props: { title: 'Food Component' } },
  ];
  return (
    <div className="container">
      <main className="main">
        <DynamicComponent comps={components} />
      </main>
    </div>
  );
}
