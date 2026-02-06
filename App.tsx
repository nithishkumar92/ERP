
import React, { useState, useEffect } from 'react';
import { Team } from './types';
import Login from './components/mobile/Login';
import MobileApp from './components/mobile/MobileApp';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [teamInfo, setTeamInfo] = useState<Team | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('teamToken');
    const savedTeam = localStorage.getItem('teamInfo');
    if (savedToken && savedTeam) {
      setIsAuthenticated(true);
      setTeamInfo(JSON.parse(savedTeam));
    }
  }, []);

  const handleLogin = (team: Team) => {
    localStorage.setItem('teamToken', 'mock-jwt-token');
    localStorage.setItem('teamInfo', JSON.stringify(team));
    setIsAuthenticated(true);
    setTeamInfo(team);
  };

  const handleLogout = () => {
    localStorage.removeItem('teamToken');
    localStorage.removeItem('teamInfo');
    setIsAuthenticated(false);
    setTeamInfo(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return teamInfo ? <MobileApp teamInfo={teamInfo} onLogout={handleLogout} /> : null;
};

export default App;
