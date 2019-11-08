var app = new Vue({
  el: '#app',
  data: {
      someOtherProperty: null,
      ddTestVm: {
          originalValue: [],
          ddTestSelectedOption: "Click a Company",
          disabled: false,
          readonly: false,
          visible: true,
          color: "",
          options: [
              {
                  "value": "Access",
                  "text": "Access"
              },
              {
                  "value": "Akai",
                  "text": "Akai"
              },
              {
                  "value": "Alesis",
                  "text": "Alesis"
              },
              {
                  "value": "Arturia",
                  "text": "Arturia"
              },
              {
                  "value": "Casio",
                  "text": "Casio"
              },
              {
                  "value": "Dreadbox",
                  "text": "Dreadbox"
              },
              {
                  "value": "Korg",
                  "text": "Korg"
              },
              {
                  "value": "Make Noise",
                  "text": "Make Noise"
              },
              {
                  "value": "Maker",
                  "text": "Maker"
              },
              {
                  "value": "Moog",
                  "text": "Moog"
              },
              {
                  "value": "Novation",
                  "text": "Novation"
              },
              {
                  "value": "Oberheim",
                  "text": "Oberheim"
              },
              {
                  "value": "Pittsburgh Modular",
                  "text": "Pittsburgh Modular"
              },
              {
                  "value": "Roland",
                  "text": "Roland"
              },
              {
                  "value": "Sequential Circuits",
                  "text": "Sequential Circuits"
              },
              {
                  "value": "Teenage Engineering",
                  "text": "Teenage Engineering"
              },
              {
                  "value": "Yamaha",
                  "text": "Yamaha"
              }
          ]
      },
      synths: [],
  },
  methods: {
    /*fetchREST() {
      console.log("In Fetch " + this.prefix);
      var url = "http://cs260labs.natewilsonit.com:3000/getsynth?q=" + this.prefix;
      console.log("URL " + url);
      fetch(url)
        .then((data) => {
          return (data.json());
        })
        .then((citylist) => {
          console.log("CityList");
          console.log(citylist);
          this.cities = [];
          for (let i = 0; i < citylist.length; i++) {
            console.log(citylist[i].city);
            this.cities.push({ name: citylist[i].city });
          };
          console.log("Got Citylist");
        });
    },*/
    changeItem: async function () 
    {
      //grab some remote data
          try {
            console.log("In Fetch ");
              let response = await this.$http.get('http://cs260.natewilsonit.com:3000/getsynth?q=' + this.ddTestVm.ddTestSelectedOption);
              console.log(response.data);
              this.synths = response.data;
          } catch (error) {
              console.log(error)
          }
    }
  },
  watch: {

  },
  async created() {

  }
});
