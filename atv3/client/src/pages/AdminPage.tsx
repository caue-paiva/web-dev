import { useState } from 'react';
import PotionForm from '../components/Admin/PotionForm';
import PotionList from '../components/Admin/PotionList';

const AdminPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handlePotionAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1>Administração de Poções</h1>
        <PotionForm onPotionAdded={handlePotionAdded} />
        <PotionList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default AdminPage;
