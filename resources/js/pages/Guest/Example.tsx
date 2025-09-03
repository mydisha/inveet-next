import GuestList from './GuestList';

// Example usage of the GuestList component
export default function GuestListExample() {
  const user = {
    id: 1,
    name: 'Dias Taufik Rahman',
    email: 'dias@example.com',
    hasWedding: true
  };

  const weddingId = '123';
  const invitationLink = 'https://inveet.id/invitation/429dbdda-35ae-4f9e-863b-f60987ade6c9/dias-azalia/share';

  return (
    <GuestList
      user={user}
      weddingId={weddingId}
      invitationLink={invitationLink}
    />
  );
}
