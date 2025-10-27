import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {
                setUser(null);
                setRole(null);
                setLoading(false);
                return;
            }

            setUser(user);

            const { data: nastavnik } = await supabase
                .from('nastavnici')
                .select('*')
                .eq('id', user.id)
                .single();

            if (nastavnik) {
                setRole('nastavnik');
                

            } else {

                const { data: admin } = await supabase
                    .from('administratori')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                console.log('Admin:', admin);
                if (admin) {
                    setRole('admin');
                    
                } else {
                    setRole(null);
                }
            }

            setLoading(false);

            console.log('Auth user ID:', user.id);
            console.log('Nastavnik:', nastavnik);
            
        };

        fetchUserData();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {

            fetchUserData();
        });

        return () => {
            listener.subscription.unsubscribe();
        }


    }, []);

    return (
        <UserContext.Provider value={{ user, role, loading }}>
            {children}
        </UserContext.Provider>
    );

}

    export function useUser() {
        return useContext(UserContext);
    }


