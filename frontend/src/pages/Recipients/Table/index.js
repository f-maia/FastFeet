import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Table from '~/components/TablePage';
import Pagination from '~/components/Pagination';
import Spinner from '~/components/Spinner';

import TableRow from './TableRow';

import { customStyle, Warning } from './styles';

export default function RecipientsTable() {
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const itemsPerPage = 6;
  const HEADERS = ['ID', 'Nome', 'Endereço', 'Ações'];

  const memoizedLoadRecipients = useCallback(
    (onDelete) => {
      async function loadRecipients() {
        setLoading(true);

        try {
          const response = await api.get('/recipients', {
            params: { page, q: query },
          });
          const { data, headers } = response;

          if (onDelete && data.length === 0 && page > 1) {
            setPage(page - 1);
          }

          setTotalItems(Number(headers['x-total-count']));
          setRecipients(data);
        } catch (err) {
          toast.error(
            'Não foi possível carregar os dados. Tente recarregar a página novamente.'
          );
        }

        setLoading(false);
      }

      loadRecipients();
    },
    [page, query]
  );

  useEffect(() => {
    memoizedLoadRecipients();
  }, [memoizedLoadRecipients]);

  function handlePageDecrease() {
    if (page === 1) return;

    setPage(page - 1);
  }

  function handlePageIncrease() {
    if (page >= totalItems / itemsPerPage) return;

    setPage(page + 1);
  }

  function handleSearch(value) {
    setQuery(value);
  }

  function handleDelete() {
    memoizedLoadRecipients(true);
  }

  return (
    <>
      <Table
        partialTitle="destinatários"
        search={handleSearch}
        headers={HEADERS}
        customStyle={customStyle}
      >
        {!loading &&
          recipients.map((recipient) => (
            <TableRow
              key={recipient.id}
              data={recipient}
              onDelete={handleDelete}
            />
          ))}
      </Table>
      {loading && <Spinner size={250} />}
      {!loading &&
        (recipients.length === 0 ? (
          <Warning>Nenhum item encontrado</Warning>
        ) : (
          <Pagination
            page={page}
            totalItems={totalItems}
            onIncrease={handlePageIncrease}
            onDecrease={handlePageDecrease}
          />
        ))}
    </>
  );
}
