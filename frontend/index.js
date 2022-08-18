const { createApp, ref, onMounted } = Vue;

const app = createApp({
  setup() {
    const url = "http://localhost:6500/jeniskopi";

    const jeniskopi = ref({
      id: null,
      name:"",
      rasa:"",
      origin:"",
      list: [],
      erorrMessage:"",
      isErorr: false,
      isUpdate: false,
  });

    const getJeniskopi= async () => {
      try {
        jeniskopi.value.isUpdate = false;
        const resJeniskopi = await axios.get(url);
        if (resJeniskopi.data.length === 0)
          throw new Error("jeniskopi tidak ada");
        jeniskopi.value.list = resJeniskopi.data;
        return resJeniskopi.data;
      } catch (err) {
          jeniskopi.value.isError = true;
          jeniskopi.value.errorMessage = err.message;
          jeniskopi.value.isUpdate = false;
      }
    };

    const getJeniskopiById = async (id) => {
      try {
        const resJeniskopi = await axios.get(url + `/${id}`);
        if (resJeniskopi.data.length === 0)
            throw new Error("jeniskopi tidak ada");
        jeniskopi.value.isUpdate = true;
        jeniskopi.value.id = id;
        jeniskopi.value.name = resJeniskopi.data.name;
        jeniskopi.value.rasa = resJeniskopi.data.rasa;
        jeniskopi.value.origin = resJeniskopi .data.origin;
        return resJeniskopi.data;
      } catch (err) {
        jeniskopi.value.name = "";
        jeniskopi.value.rasa = "";
        jeniskopi.value.origin= "";
        jeniskopi.value.isUpdate = false;
        jeniskopi.value.isError = true;
        jeniskopi.value.errorMessage = err.message;
      }
    };

    const deleteJeniskopi = async (id) => {
      try {
        jeniskopi.value.isUpdate = false;
        const resJeniskopi = await axios.delete(url + "/delete", {
            data: {
                id,
            },
        });
        if (resJeniskopi.data.length === 0)
          throw new Error("jeniskopi tiak ada");
          jeniskopi.value.list = resJeniskopi.data;
        await getJeniskopi();
        return resJeniskopi.data;
      } catch (err) {
        jeniskopi.value.isError = true;
        jeniskopi.value.errorMessage = err.message;
      }
    };

    const submitJeniskopi = async () => {
      try {
        jeniskopi.value.isUpdate = false;
        const post = await axios.post(url + "/create", {
          name: jeniskopi.value.name,
          rasa: jeniskopi.value.rasa,
          origin: jeniskopi.value.origin,
        });
        jeniskopi.value.isUpdate = false;
        jeniskopi.value.name = "";
        jeniskopi.value.rasa = "";
        jeniskopi.value.origin = "";
        jeniskopi.value.isUpdate = false;
        if (!post) throw new Error("Gagal membuat jeniskopi");
        await getJeniskopi();
      } catch (err) {
        jeniskopi.value.isError = true;
        jeniskopi.value.errorMessage = err.message;
      }
    };

    const updateJeniskopi = async () => {
      try {
        jeniskopi.value.isUpdate = false;
        const put = await axios.put(url + "/update", {
          id: jeniskopi.value.id,
          name: jeniskopi.value.name,
          rasa: jeniskopi.value.rasa,
          origin: jeniskopi.value.origin,
        });
        jeniskopi.value.isError = false;
        jeniskopi.value.name = "";
        jeniskopi.value.rasa = "";
        jeniskopi.value.kopi = "";
        jeniskopi.value.isUpdate = false;
        jeniskopi.value.isError = true;
        if (!put) throw new Error("Gagal mengupdate jeniskopi");
        await getJeniskopi();
      } catch (err) {
        jeniskopi.value.isUpdate = false;
        jeniskopi.value.isError = true;
        jeniskopi.value.errorMessage = err.message;
      }
    };

    onMounted(async () => {
      await getJeniskopi();
    });

    return {
      jeniskopi,
      submitJeniskopi,
      updateJeniskopi,
      deleteJeniskopi,
      getJeniskopiById,
    };
  },
});

app.mount("#app");