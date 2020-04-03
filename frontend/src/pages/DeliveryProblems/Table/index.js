import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Table from '~/components/TablePage';
import Pagination from '~/components/Pagination';
import Spinner from '~/components/Spinner';

import TableRow from './TableRow';

import { customStyle, Warning } from './styles';

export default function DeliveryProblemsTable() {
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [deliveryProblems, setDeliveryProblems] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;
  const HEADERS = ['Encomenda', 'Problema', 'Ações'];

  const memoizedLoadDeliveryProblems = useCallback(() => {
    async function loadDeliveryProblems() {
      setLoading(true);

      try {
        const response = await api.get('/deliveries/problems', {
          params: { page },
        });
        const { data, headers } = response;

        let problemsList = [];
        data.forEach((delivery) => {
          const problems = delivery.problems.map((item) => ({
            ...item,
            delivery: { ...delivery },
          }));
          problemsList = [...problemsList, ...problems];
        });

        setTotalItems(Number(headers['x-total-count']));
        setDeliveryProblems(problemsList);
      } catch (err) {
        toast.error(
          'Não foi possível carregar os dados. Tente recarregar a página novamente.'
        );
      }

      setLoading(false);
    }

    loadDeliveryProblems();
  }, [page]);

  useEffect(() => {
    memoizedLoadDeliveryProblems();
  }, [memoizedLoadDeliveryProblems]);

  function handlePageDecrease() {
    if (page === 1) return;

    setPage(page - 1);
  }

  function handlePageIncrease() {
    if (page >= totalItems / itemsPerPage) return;

    setPage(page + 1);
  }

  return (
    <>
      <Table
        title="Problemas na entrega"
        headers={HEADERS}
        customStyle={customStyle}
      >
        {!loading &&
          deliveryProblems.map((problems) => (
            <TableRow
              key={problems.id}
              data={problems}
              onDelete={memoizedLoadDeliveryProblems}
            />
          ))}
      </Table>
      {loading && <Spinner size={250} />}
      {!loading &&
        (deliveryProblems.length === 0 ? (
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
