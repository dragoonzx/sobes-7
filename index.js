export async function getPlaystationData(userId) {
  const playstationData = await fetch(`/api/playstation/`)
  const userData = await fetch(`/api/users/${userId}`)
  const validDeliveryProps = { deliveryDate: true, amount: false, };
  let data;
  switch (true) {
    case userData.role == 'reseller':
      data = {
        title: userData.title,
        price: userData.price,
        delivery: {},
      }
      Object.keys(validDeliveryProps).forEach(v => {
        if (validDeliveryProps[v]) {
          if (v === 'deliveryDate') {
            data.delivery['delivery-date'] = playstationData.deliveryDate
          } else {
            data.delivery[v] = playstationData[v];
          }
        }
      })
      break;
    case userData.role == 'customer':
      data = {
        title: userData.title,
        role: userData.role,
      }
  }
  return data;
} 