<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/related_var/vendor/autoload.php';


class DbClient
{
    private $client;
    private $sbsCollection;
    private $regSecCollection;
    private $relSectorsCollection;

    public function __construct()
    {
        if (!isset($this->client)) {
            $this->client = new MongoDB\Client("");
        }
        $this->sbsCollection = $this->client->euproject->sbs;
        $this->regSecCollection = $this->client->euproject->region_sectors;
        $this->relSectorsCollection = $this->client->euproject->rel_sectors;
    }

    //Out: <Sector, Count> array for each country
    function getAllCountries()
    {
        $cursor = $this->sbsCollection->find();
        if ($cursor == null) {
            return [];
        }
        $cursorArray = iterator_to_array($cursor);
        foreach ($cursorArray as $i => $country) {
            $cursorArray[$i] = iterator_to_array($country);
            unset($cursorArray[$i]['_id']);
            unset($cursorArray[$i]['Regions']);
        }
        return $cursorArray;
    }

    //In: Country string, example "Greece"
    //Out: <Sector, Count> array for that country
    function findByCountryString($countryStr)
    {
        $cursor = $this->sbsCollection->findOne(['Country' => $countryStr]);
        if ($cursor == null) {
            return [];
        }
        $cursorArray = iterator_to_array($cursor);
        unset($cursorArray['_id']);
        unset($cursorArray['Regions']);
        return $cursorArray;
    }

    //In: Region string, example "Kentriki Makedonia"
    //Out: <Sector, Count> array for that region
    function findByRegionString($regionStr)
    {
        $cursor = $this->sbsCollection->findOne(['Regions.Region' => $regionStr]);
        if ($cursor == null) {
            return [];
        }
        $regionsCursorArray = iterator_to_array($cursor['Regions']);

        $regionsArray = [];
        foreach ($regionsCursorArray as $i => $region) {
            $regionsArray[$i] = iterator_to_array($regionsCursorArray[$i]);
        }

        $key = array_search($regionStr, array_column($regionsArray, 'Region'));
        return $regionsArray[$key];
    }

    //Out: ["Greece","Belgium", ...]
    function getAllCountryStrings()
    {
        $cursor = $this->sbsCollection->find();
        $cursorArray = iterator_to_array($cursor);
        $countryStringsArray = [];
        foreach ($cursorArray as $i => $country) {
            $countryStringsArray[$i] = $country['Country'];
        }
        return $countryStringsArray;
    }

    //In: "Greece"
    //Out: ["Anatoliki Makedonia Thraki","Kentriki Makedonia", ...]
    function getAllRegionStringsByCountry($country)
    {
        $cursor = $this->sbsCollection->findOne(['Country' => $country]);
        if ($cursor == null) {
            return [];
        }
        $regionsCursorArray = iterator_to_array($cursor['Regions']);

        $regionsStringArray = [];
        foreach ($regionsCursorArray as $i => $region) {
            $regionsStringArray[$i] = iterator_to_array($regionsCursorArray[$i]);
            $regionsStringArray[$i] = $regionsStringArray[$i]["Region"]; //krata mono to pedio region
        }
        return $regionsStringArray;
    }

    //In: Nuts code, example: "EL20"
    //Out: List of sectors
    function getSectorsForNuts($nuts)
    {
        $cursor = $this->regSecCollection->findOne(['reg_up_code' => $nuts]);
        if ($cursor == null) {
            return [];
        }
        $ipcCursorArray = iterator_to_array($cursor['IPC']);
        return $ipcCursorArray;
    }

    //In: Array of sectors: [sec1, sec2,..]
    //Out: Array of sectors with nested relative sectors: [Sec1[sec1,sec2,..],Sec2[sec2,sec3,..]]
    //Error: In case the sector is not found, or doesn't contain any relative sectors, the sector name
    //and an empty array is returned. Example json: "fsjafjsfdsfsa": []
    function getRelativeSectorsOfSectors($sectorArray)
    {
        $outArray = [];
        foreach ($sectorArray as $i => $sector) {
            $cursor = $this->relSectorsCollection->findOne(["name" => $sector]);
            if ($cursor == null) {
                $outArray[$sector] = [];
            } else {
                $relatedArray = iterator_to_array($cursor['related']);
                $outArray[$sector] = $relatedArray;
            }
        }
        return $outArray;
    }

}
