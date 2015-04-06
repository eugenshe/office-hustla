<?php

namespace common\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;

/**
 * SearchUser represents the model behind the search form about `common\models\User`.
 */
class SearchVacancy extends Vacancy
{
    public function rules() {
        return [
            [['_id', 'name', 'status', 'created_at', 'updated_at', 'createdAtFormatted', 'updatedAtFormatted',
                'type', 'city'], 'safe'],
        ];
    }

    public function scenarios() {
        return Model::scenarios();
    }

    public function search($params) {
        $query = Vacancy::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 20,
            ],
            'sort' => [
                'attributes' => [
                    '_id',
                    'name',
                    'createdAtFormatted' => [
                        'asc' => ['created_at' => SORT_ASC],
                        'desc' => ['created_at' => SORT_DESC],
                    ],
                    'domain',
                ],
                'defaultOrder' => ['createdAtFormatted' => SORT_DESC],
            ],
        ]);

        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }

        if ($this->name != '') {
            $query->andFilterWhere(['like', 'name', $this->name]);
        }

        if ($this->city != '') {
            $query->andFilterWhere(['like', 'city', $this->city]);
        }
        
        // $query->andFilterWhere(['like', 'route', $this->route])
        //     ->andFilterWhere(['like', 'role', $this->role])
        //     ->andFilterWhere(['like', 'status', $this->status])
        //     // ->andFilterWhere(['like', 'created_at', $this->created_at])
        //     ->andFilterWhere(['like', 'name', $this->name])
        //     ->andFilterWhere(['like', 'link', $this->link])
        //     ->andFilterWhere(['like', 'gender', $this->gender])
        //     ->andFilterWhere(['like', 'email', $this->email])
        //     // ->andFilterWhere(['like', 'hometown', $this->hometown])
        //     // ->andFilterWhere(['like', 'location', $this->location])
        //     ->andFilterWhere(['like', 'bio', $this->bio])
        //     ->andFilterWhere(['like', 'public_link', $this->public_link])
        //     ->andFilterWhere(['like', 'reseller_club', $this->reseller_club])
        //     ->andFilterWhere(['like', 'domain', $this->domain]);

        return $dataProvider;
    }


}