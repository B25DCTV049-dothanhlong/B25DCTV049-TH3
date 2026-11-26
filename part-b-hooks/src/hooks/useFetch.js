import { useState, useEffect } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(url)
      .then((res) => (res.ok ? res.json() : Promise.reject('Lỗi tải dữ liệu')))
      .then((json) => setData(json.reverse()))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, [url]);

  const addItem = async (item) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error('Lỗi thêm khoản chi');
      const created = await res.json();
      setData((prev) => [created, ...prev]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`${url}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Lỗi xóa khoản chi');
      setData((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return { data, loading, error, addItem, deleteItem };
}