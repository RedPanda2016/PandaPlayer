let helpers = {
  post: (data) => {
    $.post('http://127.0.0.1:2727/api/auth', {
      data: data,
      dataType: 'json'
    });
  },
  get: () => {}
}